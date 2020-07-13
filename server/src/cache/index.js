const NodeCache = require('node-cache')
const ipCache = new NodeCache()
const imgCache = new NodeCache({ stdTTL: 1200, maxKeys: 10 })

module.exports = {
  ipCache, imgCache
}
