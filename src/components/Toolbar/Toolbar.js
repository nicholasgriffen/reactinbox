import React from 'react'

const Toolbar = ({ 
    onDeleteClick,
    onSelectClick, 
    selected, 
    unselected, 
    onReadClick, 
    onUnReadClick, 
    unread, 
    onApplyLabel,
    labels,      
}) => (
    <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{ unread }</span>
                unread messages
            </p>

            <button className="btn btn-default" 
                onClick={() => onSelectClick(selected)}>
                <i className={`fa ${ 
                        selected === 0 ? "fa-square-o" 
                    : unselected === 0 ? "fa-check-square-o" 
                    :                    "fa-minus-square-o" }`}>
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
            <select onChange={e => onApplyLabel(e.target.value)}className="form-control label-select">
                    <option>Apply label</option>
                    {labels
                    .reduce((acc, label) => {
                        if (!acc.includes(label)) return [...acc, label]
                        return acc
                    }, [])
                    .map((label, index) => {
                        return <option key={index} value={label}>{label}</option>
                    })}
            </select>
            <button className="btn btn-default"
                  disabled={ selected ? false : true }
                  onClick={() => onDeleteClick(selected)}
                  >
            <i className="fa fa-trash-o"></i>
            </button>
        </div>
    </div>
)

export default Toolbar 