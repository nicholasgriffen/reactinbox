import React from 'react'

const Toolbar = ({ 
    onComposeClick,
    onDeleteClick,
    onSelectClick, 
    selected, 
    unselected, 
    onReadClick, 
    unread, 
    onChangeLabel,
    labels,      
}) => (
    <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{ unread }</span>
                unread message{unread === 1 ? "" : "s"}
            </p>

            <a className="btn btn-danger"
                onClick={e => {
                    e.preventDefault()
                    onComposeClick()
                }}>
                <i className="fa fa-plus"></i>
            </a>

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
                onClick={() => onReadClick(true)}
            >
                Mark As Read
            </button>
            <button className="btn btn-default" 
                disabled={ selected ? false : true }
                onClick={() => onReadClick(false)}
            >
                Mark As Unread
            </button>
            <select className="form-control label-select" 
                disabled={ selected ? false : true }
                onChange={e => onChangeLabel(e.target.value, "addLabel")}>
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
            <select className="form-control label-select"
                disabled={ selected ? false : true }
                onChange={e => onChangeLabel(e.target.value, "removeLabel")}>
                    <option>Remove label</option>
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
                  onClick={onDeleteClick}
                  >
            <i className="fa fa-trash-o"></i>
            </button>
        </div>
    </div>
)

export default Toolbar 