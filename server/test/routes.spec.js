const chai = require('chai')
const chaiHttp = require('chai-http')
const { server } = require('app')

const expect = chai.expect
chai.use(chaiHttp)

describe('Router', () => {
  it('should GET /', done => {
    chai.request(server).get('/').end((err, res) => {
      expect(res).to.have.status(200)
    })
    done()
  })
  it('should GET /visitors', done => {
    chai.request(server).get('/visitors').end((err, res) => {
      expect(res).to.have.status(200)
    })
    done()
  })
  it('should GET /api/visitors', done => {
    chai.request(server).get('/api/visitors').end((err, res) => {
      expect(res).to.have.status(200)
    })
    done()
  })
})
