import React from 'react'
import { ChatEngine } from 'react-chat-engine'

import './Message.css'
import ChatFeed from '../../components/Conversation/ChatFeed'

const projectID = '5ae05ac3-2130-4648-8d2d-1d89723a9fa3'

const Message = () => {
  return (
    <ChatEngine 
      height='100vh'
      projectID={projectID}
      userName='johndoe'
      userSecret='hotdog'
      renderChatFeed={(chatAppProps) => <ChatFeed  {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  )
}

export default Message