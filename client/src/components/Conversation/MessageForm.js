import { useState } from 'react'
import { sendMessage, isTyping }  from 'react-chat-engine'
import { SendOutlined, PictureOutlined } from '@ant-design/icons'

const MessageForm = (props) => {
  const [valueState, setValueState] = useState('')
  const { chatId, creds } = props

  const handleSubmit = (event) => {
    event.preventDefault()

    const text = valueState.trim()
    if(text.length > 0) sendMessage(creds, chatId, { text })

    setValueState('')
  }

  const handleChange = (event) => {
    setValueState(event.target.value)

    isTyping(props, chatId)


  }

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' })
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input 
        className="message-input" 
        placeholder="Send a message..." 
        value={valueState} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        type="text"/>
      <label htmlFor="upload-button">
        <span className="image-button"></span>
          <PictureOutlined className="picture-icon" />
      </label>
      <input 
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon"/>
      </button>
    </form>
  )
}

export default MessageForm