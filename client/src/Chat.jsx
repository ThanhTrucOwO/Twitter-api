import { useEffect, useState } from 'react'
import socket from './socket'

export default function Chat() {
  const profile = JSON.parse(localStorage.getItem('profile')) || {}
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState([])
  useEffect(() => {
    socket.auth = {
      _id: profile._id
    }
    socket.connect()
    socket.on('receive private message', (data) => {
      const content = data.content
      setMessages((messages) => [
        ...messages,
        {
          content,
          isSender: false
        }
      ])
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  const send = (e) => {
    e.preventDefault()
    setValue('')
    socket.emit('private message', {
      content: value,
      to: '66f4b65545a4f884a5fb53f7' // user_id của client 2
    })
    setMessages((messages) => [
      ...messages,
      {
        content: value,
        isSender: true
      }
    ])
  }

  return (
    <div>
      <h1>Chat</h1>
      <div className='chat'>
        {messages.map((message, index) => (
          <div key={index}>
            <div className='message-container'>
              <div className={'message ' + (message.isSender ? 'message-right' : '')}>{message.content}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={send}>
        <input type='text' onChange={(e) => setValue(e.target.value)} value={value} />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
