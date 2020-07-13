const fetch = require('node-fetch')
const { ipCache, imgCache } = require('cache')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const Jimp = require('jimp')

const queryIP = async (ip) => {
  const response = await fetch(`https://js5.c0d3.com/location/api/ip/${ip}`)
  const data = await response.json()
  return data
}

const addCacheItem = async (ip) => {
  if (!ipCache.has(ip)) {
    const ipInfo = await queryIP(ip)
    const cacheItem = {count: 1, data: ipInfo}
    ipCache.set(ip, cacheItem)
  } else {
    const cacheItem = ipCache.get(ip)
    ipCache.set(ip, {count: cacheItem.count + 1, data: cacheItem.data})
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

const renderImage = async (text, query) => {
  const { blur, src, black } = query
  const image = (src
    ? await Jimp.read(src)
    : await Jimp.read('https://placeimg.com/640/480/any')
  )

  const font = (black == true
    ? await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
    : await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
  )
  await image.print(font, 5, 5, text)

  const blurValue = Number(blur)
  if (blurValue > 0) {
    await image.blur(blurValue)
  }
  const buffer = await image.getBufferAsync('image/jpeg')
  return buffer
}

module.exports = {
  queryIP, addCacheItem, processCommand, renderImage
}
