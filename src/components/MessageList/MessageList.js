import React from 'react'

import Message from '../Message/Message' 

const MessageList = ({ messages, onStarClick, onMessageClick, onSubjectClick }) => (
        messages.map((message, index) => (
            <Message 
            key={index} 
            message={message}
            
            onMessageClick={ onMessageClick }
            checked={message.selected ? true : false}
            
            onStarClick={ onStarClick }
            
            onSubjectClick={ onSubjectClick }
            />
        ))
)

export default MessageList