const Router = require('koa-router')
const apiRouter = new Router({prefix: '/api'})
const { ipCache, imgCache } = require('cache')
const { queryIP, addCacheItem, processCommand, renderImage } = require('utils')

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

module.exports = apiRouter
