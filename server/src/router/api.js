const Router = require('koa-router')
const apiRouter = new Router({prefix: '/api'})
const cache = require('cache')
const { queryIP, addCacheItem, processCommand } = require('utils')

apiRouter.get('/visitors', async ctx => {
  const ip = ctx.request.header['x-forwarded-for'] || ctx.request.ip
  await addCacheItem(ip)
  const ipInfo = cache.get(ip)
  const cacheItems = cache.keys().map(key => cache.get(key))

  ctx.body = {session: ipInfo, cached: cacheItems}
})

apiRouter.post('/commands', async ctx => {
  const cmd = ctx.request.body.command
  if (cmd === undefined) throw new Error('No data sent in POST request')
  ctx.body = await processCommand(cmd)
})

module.exports = apiRouter
