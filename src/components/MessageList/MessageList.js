import React from 'react'

import Message from '../Message/Message' 

const MessageList = ({ messages, onStarClick, onCheckClick, onSubjectClick }) => (
        messages.map((message, index) => (
            <Message 
            key={index} 
            message={message}
            
            onCheckClick={ onCheckClick }
            checked={message.selected ? true : false}
            
            onStarClick={ onStarClick }
            
            onSubjectClick={ onSubjectClick }
            />
        ))
)

export default MessageList