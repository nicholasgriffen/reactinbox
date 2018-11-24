import React from 'react'

import Message from '../Message/Message' 

const MessageList = ({ messages, onStarClick }) => (
    <div>
        {messages.map((message, index) => (
            <Message 
            key={index} 
            message={message}
            onStarClick={ onStarClick }/>
        ))}
    </div>
)

export default MessageList