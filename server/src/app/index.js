const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.status = 200
  ctx.body = 'Index Page'
})

const server = app.listen(5000)

module.exports = {
  server
}
