const userField = document.querySelector('#username')
const passField = document.querySelector('#password')
const submit = document.querySelector('#submit')
const loginResponse = document.querySelector('.loginResponse')

submit.onmouseup = async (event) => {
  const password = window.btoa(passField.value)
  const request = await fetch('https://js5.c0d3.com/auth/api/session', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({username: userField.value, password: password})
  })
  const data = await request.json()

  if ('error' in data) {
    const errMessage = document.createElement('div')
    errMessage.style.color = 'red'
    errMessage.innerHTML = 'Invalid credentials'
    loginResponse.innerHTML = ''
    loginResponse.append(errMessage)
  } else {
    localStorage.setItem('jwt', data.jwt)
    window.location = '/chat'
  }
}
