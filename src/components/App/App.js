import React, { Component } from 'react'

import Toolbar from '../Toolbar/Toolbar'
import MessageList from '../MessageList/MessageList'

import './App.css'

class App extends Component {

  constructor() {
    super()

    this.state = {
      messages: [],
    }
    this.API = 'http://localhost:8082/api/messages'
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
        errors: [...this.state.errors, await res.json]
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

  onMessageClick = id => {
    this.setState({
      ...this.state, 
      messages: this.state.messages.map(message => {
        if (message.id === id) {
          message.selected ? delete message.selected : message.selected = true
        }
        return message
      })
    })
  }
  
  onSelectClick = selected => {
    if (selected < this.state.messages.length) { 
      this.setState({
        ...this.state,
        messages: this.state.messages.map(message => {
          message.selected = true
          return message
        })
      })
    } else {
      this.setState({
        ...this.state, 
        messages: this.state.messages.map(message => {
          delete message.selected 
          return message
        })
      })
    }    
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
        errors: [...this.state.errors, await res.json]
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
        errors: [...this.state.errors, await res.json]
      })
      return 
    }

      this.setState({
        ...this.state,
        messages: this.state.messages
        .filter(message => !message.selected)
      })
    }
  
    onApplyLabel = label => {
      if (!label || label === "Apply label") return

      this.setState({
        ...this.state, 
        messages: this.state.messages
        .map(message => {
          if (message.selected && !message.labels.includes(label)) {
            message.labels.push(label)
          }
          return message
        })
      })
    }

    onRemoveLabel = label => {
      if (!label || label === "Remove label") return

      this.setState({
        ...this.state, 
        messages: this.state.messages 
        .map(message => {
          if (message.selected && message.labels.includes(label)) {
            message.labels = message.labels.filter(existing => existing !== label)
          }
          return message
        })
      })
    }


  render() {
    return (
      <div className="App">
        <Toolbar 
          onDeleteClick={this.onDeleteClick}
                  
          onSelectClick={this.onSelectClick}
          selected={this.state.messages.filter(message => message.selected).length}    
          unselected={this.state.messages.filter(message => !message.selected).length}

          onReadClick={this.onReadClick}        
          unread={this.state.messages.filter(message => !message.read).length}

          onApplyLabel={this.onApplyLabel}
          onRemoveLabel={this.onRemoveLabel}
          labels={this.state.messages
            .filter(message => message.labels.length)
            .map(message => message.labels)
            .reduce((acc, labelArray) => ([...acc, ...labelArray]), ["dev", "personal", "gschool"])}
        />

        <MessageList 
          onMessageClick={ this.onMessageClick }
          messages={ this.state.messages } 
          
          onStarClick={ this.onStarClick } 
        />
      </div>
    )
  }
}

export default App
