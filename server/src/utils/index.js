const fetch = require('node-fetch')
const cache = require('cache')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

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

const processCommand = async (cmd) => {
  command = cmd.split(' ')[0]
  const commands = ['ls', 'pwd', 'cat']
  if (commands.includes(command)) {
    try {
      const { stdout, stderr } = await exec(cmd)
      return stdout
    } catch (err) {
      return `Error: Command failed: ${cmd}\n ${err.stderr}`
    }
  } else {
    return `${command}: command not found`
  }
}

module.exports = {
  queryIP, addCacheItem, processCommand
}
