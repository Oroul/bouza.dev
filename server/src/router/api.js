const Router = require('koa-router')
const apiRouter = new Router({prefix: '/api'})
const { ipCache, imgCache } = require('cache')
const { queryIP, addCacheItem, processCommand, renderImage } = require('utils')
const fetch = require('node-fetch')
const fs = require('fs')
const { fileTimeouts } = require('utils')
const rooms = {}

apiRouter.get('/visitors', async ctx => {
  const ip = ctx.request.header['x-forwarded-for'] || ctx.request.ip
  await addCacheItem(ip)
  const ipInfo = ipCache.get(ip)
  const cacheItems = ipCache.keys().map(key => ipCache.get(key))

  ctx.body = {session: ipInfo, cached: cacheItems}
})

apiRouter.post('/commands', async ctx => {
  const cmd = ctx.request.body.command
  if (cmd === undefined) throw new Error('No data sent in POST request')
  ctx.body = await processCommand(cmd)
})

apiRouter.get('/memegen/:text', async ctx => {
  if (imgCache.has(ctx.url)) {
    const imageBuffer = imgCache.get(ctx.url)
    ctx.body = imageBuffer
  } else {
    const imageBuffer = await renderImage(ctx.params.text, ctx.query)
    imgCache.set(ctx.url, imageBuffer)
    ctx.body = imageBuffer
  }
  ctx.response.set('Content-Type', 'image/jpeg')
})

apiRouter.get('/files', async ctx => {
  const files = await fs.promises.readdir('src/files')
  ctx.body = files
})

apiRouter.get('/files/:file', async ctx => {
  try {
    const file = await fs.promises.readFile(`src/files/${ctx.params.file}`)
    ctx.body = file
  } catch (err) {
    ctx.body = `${err}`
  }
})

apiRouter.post('/files', async ctx => {
  const file = ctx.request.body
  if (file === undefined) throw new Error('No data sent in POST request')
  await fs.promises.writeFile(`src/files/${file.name}`, file.data)
  fileTimeouts[file.name] = Date.now()
  ctx.status = 200
})

apiRouter.get('/session', async ctx => {
  const request = await fetch('https://js5.c0d3.com/auth/api/session', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ctx.request.header.authorization
    }
  })
  const loginStatus = await request.json()
  if ('error' in loginStatus) {
    ctx.status = 403
  } else {
    ctx.body = loginStatus
  }
})

apiRouter.get('/chat/:room/messages', async ctx => {
  const room = ctx.params.room
  ctx.body = (rooms[room] ? rooms[room] : [])
})

apiRouter.post('/chat/:room/messages', async ctx => {
  const room = ctx.params.room
  if (room in rooms) {
    rooms[room].push(ctx.request.body)
  } else {
    rooms[room] = [ctx.request.body]
  }
  ctx.status = 200
})

module.exports = apiRouter
