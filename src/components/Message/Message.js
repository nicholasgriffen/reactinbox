import React from 'react'

const Message = ({ message }) => (
    <div className={`row message 
    ${message.read ? "read" : "unread"} 
    ${message.selected ? "selected" : ""}`
    }>
        <div className="col-xs-1">
            <div className="row">
                <div className= "col-xs-2">
                    <input type="checkbox" />
                </div>
                <div className="col-xs-2">
                    <i className={`star fa ${message.starred ? "fa-star" : "fa-star-o"}`}></i>
                </div>
            </div>
        </div>
        <div className="col-xs-11">
            {message.labels.map((label, index) => (
                <span key={index} className="label label-warning">
                    {label}
                </span>
            ))}
            <a href = "#">
            {message.subject || "No Subject"}
            </a>
        </div>
    </div>
)

export default Message