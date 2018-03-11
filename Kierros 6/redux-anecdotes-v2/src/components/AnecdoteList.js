import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {notifyWithInterval} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  handleClick = async (anecdote) => {
    this.props.vote(anecdote)
    this.props.notifyWithInterval('Anecdote voted: \'' + anecdote.content + '\'', 10)
  }

  render() {
    const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.handleClick(anecdote)
                console.log('voted ' + anecdote)
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filter = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.indexOf(filter) !== -1).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filter(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  {vote, notifyWithInterval}
)(AnecdoteList)
