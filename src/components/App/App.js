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
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
          ]
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
    if (!selected) { 
      this.setState({
        ...this.state,
        messages: this.state.messages.map(message => {
          if (!message.selected) message.selected = true
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


  render() {
    return (
      <div className="App">
        <Toolbar 
        onSelectClick={this.onSelectClick}
        onReadClick={this.onReadClick}        
        onUnReadClick={this.onUnReadClick}
        onDeleteClick={this.onDeleteClick}

        selected={this.state.messages.filter(message => message.selected).length}    
        unselected={this.state.messages.filter(message => !message.selected).length}
        
        unread={this.state.messages.filter(message => !message.read).length}
        labels={this.state.messages
          .filter(message => message.labels.length)
          .map(message => message.labels)
          .reduce((acc, labelArray) => ([...acc, ...labelArray]), [])}
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
