import React, { Component } from 'react'

import Toolbar from '../Toolbar/Toolbar'
import MessageList from '../MessageList/MessageList'

import './App.css'

class App extends Component {

  constructor() {
    super()

    this.state = {
      messages: []
    }
    this.API = 'http://localhost:8082/api/messages'
  }

  async componentDidMount() {
    const messages = await fetch(this.API).then(res => res.json())

    this.setState({
      ...this.state,
      messages
    })
  }

  onStarClick = id => {
    this.setState({
      ...this.state, 
      messages: this.state.messages.map(message => {
        if (message.id === id) {
          message.starred = !message.starred
        }
        return message
      })
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

  onReadClick = selected => {
    if (!selected) return 

    this.setState({
      ...this.state,
      messages: this.state.messages
      .map(message => {
        if (message.selected) message.read = true
        return message
      })
    })
  }

  onUnReadClick = selected => {
    if (!selected) return 

    this.setState({
      ...this.state,
      messages: this.state.messages
      .map(message => {
        if (message.selected) message.read = false
        return message
      })
    })
  }

  onDeleteClick = selected => {
      if (!selected) return 

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
      if (!label || label === "Apply label") return

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
        onUnReadClick={this.onUnReadClick}
        unread={this.state.messages.filter(message => !message.read).length}

        onApplyLabel={this.onApplyLabel}
        onRemoveLabel={this.onRemoveLabel}
        labels={this.state.messages
          .filter(message => message.labels.length)
          .map(message => message.labels)
          .reduce((acc, labelArray) => ([...acc, ...labelArray]), ["dev", "personal", "business"])}
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
