import React from 'react'
import {create} from '../reducers/anecdoteReducer'
import {notifyWithInterval} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.create(content)
    this.props.notifyWithInterval('New anecdote created: \'' + content + '\'', 10)
    
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}


export default connect(
  null,
  {create, notifyWithInterval}
)(AnecdoteForm)
