const input = document.querySelector('.input')
const messages = document.querySelector('.messages')
const roomName = window.location.pathname.split('/')[2]
const user = localStorage.getItem('user')

input.onkeydown = (event) => {
  if (event.key === 'Enter' & event.target.value !== '') {
    const message = event.target.value
    input.value = ''
    fetch(`/api/chat/${roomName}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user, message: message })
    })
  }
}

function createMessageElement(message) {
  const div = document.createElement('div')
  const username = document.createElement('span')
  const text = document.createElement('span')

  username.innerHTML = message.user
  text.innerHTML = ': ' + message.message

  username.style['font-weight'] = 'bold'

  div.append(username)
  div.append(text)
  messages.append(div)
}

async function queryMessages() {
  const request = await fetch(`/api/chat/${roomName}/messages`)
  const messageList = await request.json()
  messages.innerHTML = ''
  messageList.map(message => {
    createMessageElement(message)
  })
  messages.scrollTop = messages.scrollHeight
}

setInterval(queryMessages, 500)

window.onload = queryMessages
