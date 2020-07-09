const Router = require('koa-router')
const apiRouter = require('router/api')
const send = require('koa-send')

const router = new Router()
router.use(apiRouter.routes())

router.get('/', ctx => {
  ctx.body = 'Index'
})

router.get('/visitors', async ctx => {
  await send(ctx, '/src/public/visitors.html')
})

module.exports = router
