import React, { Component } from 'react'

import Toolbar from '../Toolbar/Toolbar'
import ComposeForm from '../ComposeForm/ComposeForm'
import MessageList from '../MessageList/MessageList'

class App extends Component {

  constructor() {
    super()

    this.state = {
      messages: [],
      composing: false
    }
    this.API = `${process.env.REACT_APP_API_URL}/api/messages`
  }

  async componentDidMount() {
    const res = await fetch(this.API)
    const messages = await res.json()
    
    if (!res.ok) {
      this.setState({
        ...this.state, 
        errors: [...this.state.errors, messages]
      })
      return 
    }

    this.setState({
      ...this.state,
      messages,
    })
  }
  
  onStarClick = async id => {
    const res = await fetch(this.API, { 
      method: "PATCH", 
      body: JSON.stringify({
        command: "star", 
        messageIds: [id]
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      } 
    })

    if (!res.ok) {
      this.setState({
        ...this.state, 
        errors: [...this.state.errors, await res.json()]
      })
      return 
    }

    this.setState({
      ...this.state, 
      messages: this.state.messages.map(message => {
        if (message.id === id) {
          message.starred = !message.starred
        }
        return message
      }),
    })
  } 

  onCheckClick = id => {
    this.setState({
      ...this.state, 
      messages: this.state.messages.map(message => {
        if (message.id === id) {
          message.selected 
          ? delete message.selected 
          : message.selected = true
        }
        return message
      })
    })
  }
  
  onSubjectClick = id => {
    this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        if (message.id === id) {
          message.expanded = !message.expanded || false
        }
        return message
      })
    })
  }

  onSelectAllClick = selected => {
      this.setState({
        ...this.state,
        messages: this.state.messages.map(message => {
          selected < this.state.messages.length 
          ? message.selected = true 
          : delete message.selected
          return message
        })
      })
    }    

  onReadClick = async read => {
    const ids = this.state.messages
    .filter(message => message.selected)
    .map(message => message.id)

    const res = await fetch(this.API, { 
      method: "PATCH", 
      body: JSON.stringify({
        command: "read",
        read, 
        messageIds: ids
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      } 
    })

    if (!res.ok) {
      this.setState({
        ...this.state, 
        errors: [...this.state.errors, await res.json()]
      })
      return 
    }

    this.setState({
      ...this.state,
      messages: this.state.messages
      .map(message => {
        if (message.selected) message.read = read
        return message
      })
    })
  }

  onDeleteClick = async () => {
    const ids = this.state.messages
    .filter(message => message.selected)
    .map(message => message.id)

    const res = await fetch(this.API, { 
      method: "PATCH", 
      body: JSON.stringify({
        command: "delete",
        messageIds: ids
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      } 
    })

    if (!res.ok) {
      this.setState({
        ...this.state, 
        errors: [...this.state.errors, await res.json()]
      })
      return 
    }

      this.setState({
        ...this.state,
        messages: this.state.messages
        .filter(message => !message.selected)
      })
    }
  
    onChangeLabel = async (label, command) => {
      if (label === "Apply label" || label === "Remove label") return

      const ids = this.state.messages
      .filter(message => message.selected)
      .map(message => message.id)

    const res = await fetch(this.API, { 
      method: "PATCH", 
      body: JSON.stringify({
        command,
        label, 
        messageIds: ids
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      } 
    })

    if (!res.ok) {
      this.setState({
        ...this.state, 
        errors: [...this.state.errors, await res.json()]
      })
      return 
    }
      this.setState({
        ...this.state, 
        messages: this.state.messages
        .map(message => {
          if (message.selected) {
            if (command === "addLabel" && !message.labels.includes(label)) {
              message.labels.push(label)
            }
            if (command === "removeLabel") {
                message.labels = message.labels.filter(existing => existing !== label)
            }
          }
          return message
        })
      })
    }

    onComposeClick = () => {
      this.setState({
        ...this.state, 
        composing: !this.state.composing
      })
    }

    onSendClick = async (subject, body) => {
      const res = await fetch(this.API, {
        method: 'POST',
        body: JSON.stringify({
          subject,
          body
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        } 
      })

      const message = await res.json()

      if (!res.ok) {
        this.setState({
          ...this.state, 
          errors: [...this.state.errors, message]
        })
        return 
      }

      this.setState({
        ...this.state, 
        composing: false,
        messages: [...this.state.messages, message]
      })
    }

  render() {
    return (
      <div className="App">
        <Toolbar 
          onComposeClick={ this.onComposeClick }
          onDeleteClick={ this.onDeleteClick }
                  
          onSelectAllClick={ this.onSelectAllClick }
          selected={ this.state.messages.filter(message => message.selected).length }    
          unselected={ this.state.messages.filter(message => !message.selected).length }

          onReadClick={ this.onReadClick }        
          unread={ this.state.messages.filter(message => !message.read).length }

          onChangeLabel={ this.onChangeLabel }
          labels={ this.state.messages
            .filter(message => message.labels.length)
            .map(message => message.labels)
            .reduce((acc, labelArray) => ([...acc, ...labelArray]), ["dev", "personal", "gschool"]) }
        />
        <ComposeForm 
          onSendClick={ this.onSendClick }
          composing={ this.state.composing }
        />
        <MessageList 
          onCheckClick={ this.onCheckClick }          
          onStarClick={ this.onStarClick } 
          onSubjectClick={ this.onSubjectClick }
          
          messages={ this.state.messages } 
        />
      </div>
    )
  }
}

export default App
