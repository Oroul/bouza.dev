const Koa = require('koa')
const router = require('router')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyParser())
app.use(serve('src/public'))
app.use(router.routes())

const server = app.listen(5000)

module.exports = {
  server
}
