window.onload = () => {
  document.querySelector('.input-box').focus()
}

const terminalOutput = document.querySelector('.output-text')
const input = document.querySelector('.input-box')

const writeLine = (text) => {
  const output = document.createElement('p')
  output.innerHTML = text
  terminalOutput.append(output)
}

const processCommand = async (cmd) => {
  writeLine(`> ${cmd.command}`)

  const response = await fetch('/api/commands', {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify(cmd)
  })

  const responseStr = await response.text()
  const lines = responseStr.split('\n')

  lines.forEach(line => {
    writeLine(line)
  })

  terminalOutput.scrollTop = terminalOutput.scrollHeight
 }

input.onkeydown = (event) => {
  if (event.key === 'Enter' & event.target.value !== '') {
    processCommand({command: event.target.value})
    event.target.value = ''
  }
}
