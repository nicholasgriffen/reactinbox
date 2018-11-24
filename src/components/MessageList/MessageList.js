import React from 'react'

import Message from '../Message/Message' 

const MessageList = ({ messages, onStarClick, onMessageClick }) => (
    <div>
        {messages.map((message, index) => (
            <Message 
            key={index} 
            
            onMessageClick={ onMessageClick }
            message={message}
            checked={message.selected ? true : false}
            
            onStarClick={ onStarClick }
            />
        ))}
    </div>
)

export default MessageList