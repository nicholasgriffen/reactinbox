import React from 'react'

const MessageList = ({ messages }) => (
    <div>
        {messages.map((message, index) => (
            <Message 
            key={index} 
            message={message}/>
        ))}
    </div>
)

export default MessageList