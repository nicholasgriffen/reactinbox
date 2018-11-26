import React from 'react'

const Message = ({ message, onStarClick, onCheckClick, onSubjectClick, checked }) => (
    <div>
        <div className={`row message 
        ${message.read ? "read" : "unread"} 
        ${message.selected ? "selected" : ""}`
        }>
            <div className="col-xs-1">
                <div className="row">
                    <div className= "col-xs-2">
                        <input 
                        type="checkbox"
                        checked={ checked }
                        onChange={ () => onCheckClick(message.id) } />
                    </div>
                    <div className="col-xs-2">
                        <i 
                        className={`star fa ${message.starred ? "fa-star" : "fa-star-o"}`}
                        onClick={ () => { onStarClick(message.id) }  }
                        ></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {message.labels.map((label, index) => (
                    <span key={index} className="label label-warning">
                        {label}
                    </span>
                ))}
                <a role="button" onClick={ () => onSubjectClick(message.id) } href="#">
                    {message.subject || "No Subject"}
                </a>
            </div>
        </div>
        <div className={`row message-body ${ message.expanded ? "" : "hidden" }`}>
            <div className="col-xs-11 col-xs-offset-1">
                {message.body}
            </div>
        </div> 
    </div>
)

export default Message