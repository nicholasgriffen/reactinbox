import React from 'react'

const ComposeForm = ({composing}) => (
    !composing 
    ? <div></div>
    : <form className="form-horizontal well">
        <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
        </div>
        <div class="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">
                Subject
            </label>
            <div className="col-sm-8">
                <input type="text" 
                className="form-control" 
                id="subject" 
                placeholder="Enter a subject" 
                name="subject"></input>
            </div>
        </div>
    </form> 
)

export default ComposeForm