const MyMessage = ({ message }) => {
  // image rendering
  if(message.attachments && message.attachments.length > 0) {
    return (
      <img 
        src={message.attachments[0].file}
        alt="message-attachement"
        className="message-images"
        style={{ float: 'right' }}
      />
    )
  }

  return (
    <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#29b6f6' }}>
      {message.text}
    </div>
  )
}

export default MyMessage