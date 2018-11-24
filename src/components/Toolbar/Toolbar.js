import React from 'react'

const Toolbar = ({ unread, selected, unselected, onSelectClick, onReadClick, onUnReadClick }) => (
    <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{ unread }</span>
                unread messages
            </p>

            <button className="btn btn-default" 
            onClick={() => onSelectClick(unselected)}>
                <i className={`fa ${ 
                    selected === 0 ? "fa-square-o" 
                    : unselected === 0 ? "fa-check-square-o" 
                : "fa-minus-square-o" }`}>
                </i>
            </button>

            <button className="btn btn-default" 
            disabled={ selected ? false : true }
            onClick={() => onReadClick(selected)}
            >
                Mark As Read
            </button>
            <button className="btn btn-default" 
            disabled={ selected ? false : true }
            onClick={() => onUnReadClick(selected)}
            >
                Mark As Unread
            </button>
        </div>
    </div>
)

export default Toolbar 