const fetch = require('node-fetch')
const cache = require('cache')

const queryIP = async (ip) => {
  const response = await fetch(`https://js5.c0d3.com/location/api/ip/${ip}`)
  const data = await response.json()
  return data
}

const addCacheItem = async (ip) => {
  if (!cache.has(ip)) {
    const ipInfo = await queryIP(ip)
    const cacheItem = {count: 1, data: ipInfo}
    cache.set(ip, cacheItem)
  } else {
    const cacheItem = cache.get(ip)
    cache.set(ip, {count: cacheItem.count + 1, data: cacheItem.data})
  }
}

module.exports = {
  queryIP, addCacheItem
}
