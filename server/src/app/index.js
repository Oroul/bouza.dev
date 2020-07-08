const Koa = require('koa')
const router = require('router')

const app = new Koa()

app.use(router.routes())

const server = app.listen(5000)

module.exports = {
  server
}
