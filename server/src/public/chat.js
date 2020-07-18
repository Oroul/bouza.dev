const getLoginStatus = async () => {
  const jwt = localStorage.getItem('jwt')
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  if (jwt) {
    headers.append('Authorization', `Bearer ${jwt}`)
  }

  const res = await fetch('/api/session', {
    headers: headers
  })

  if (res.status === 403) {
    window.location = 'login.html'
  } else {
    const data = await res.json()
    localStorage.setItem('user', data.username)
    window.location = 'roomselect.html'
  }
}

window.onload = getLoginStatus()
