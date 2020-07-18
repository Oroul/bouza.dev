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

router.get('/commands', async ctx => {
  await send(ctx, '/src/public/commands.html')
})

router.get('/chat', async ctx => {
  await send(ctx, '/src/public/chat.html')
})

router.get('/chat/:room', async ctx => {
  await send(ctx, '/src/public/chatroom.html')
})

module.exports = router
