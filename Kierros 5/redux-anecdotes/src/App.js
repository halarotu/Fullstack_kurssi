import React from 'react';

const actionFor = {
  addNew(anecdote) {
    return {
      type: 'ADD_NEW',
      data: {
        anecdote
      }
    }
  },
  vote(id) {
    return {
      type: 'VOTE',
      data: {
        id
      }
    }
  }
}

class App extends React.Component {
  
  
  addNew = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.addNew(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  vote = (id) => () => {
    this.props.store.dispatch(
      actionFor.vote(id)
    )
  }
  
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)} >vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addNew}>
          <div><input name="anecdote" /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App