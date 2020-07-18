const chai = require('chai')
const chaiHttp = require('chai-http')
const { server } = require('app')

const expect = chai.expect
chai.use(chaiHttp)

describe('Router', () => {
  it('should GET /', done => {
    chai.request(server).get('/').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })
  it('should GET /commands', done => {
    chai.request(server).get('/commands').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })
  it('should GET /visitors', done => {
    chai.request(server).get('/visitors').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })
  it('should POST /api/commands', done => {
    chai.request(server)
      .post('/api/commands')
      .send({command: 'ls'})
      .end((err, res) => {
        expect(res).to.have.status(200)
      done()
    })
  })
  it('should GET /api/visitors', done => {
    chai.request(server).get('/api/visitors').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })
  it('should GET /api/memegen/:text', done => {
    chai.request(server).get('/api/memegen/testText').end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.header['content-type']).to.equal('image/jpeg')
      done()
    })
  })
  it('should GET /api/files', done => {
    chai.request(server).get('/api/files').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })
  it('should GET /api/files/:file', done => {
    chai.request(server).get('/api/files/testfile').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })
  it('should POST /api/files', done => {
    chai.request(server)
      .post('/api/files')
      .send({name: 'testfile', data:'1234'})
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})
