import React from 'react'

import Message from '../Message/Message' 

const MessageList = ({ messages, onStarClick, onMessageClick }) => (
    <div>
        {messages.map((message, index) => (
            <Message 
            key={index} 
            message={message}
            onStarClick={ onStarClick }
            onMessageClick={ onMessageClick }/>
        ))}
    </div>
)

export default MessageList