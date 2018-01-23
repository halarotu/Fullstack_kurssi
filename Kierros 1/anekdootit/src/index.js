import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

  next = () => {
    let index = Math.floor(Math.random() * 6) 
    this.setState({selected: index})
  } 

  vote = () => {
    let newVotes = this.state.votes
    newVotes[this.state.selected] += 1
    this.setState({votes: newVotes})
  } 

  render() {
    let maxValue = Math.max(...this.state.votes)
    let maxIndex = this.state.votes.indexOf(maxValue)

    return (
      <div>
        <div>
            {this.props.anecdotes[this.state.selected]}
        </div>
        <div> 
            <p> votes: {this.state.votes[this.state.selected]} </p>
        </div>
        <div>    
            <button onClick={this.vote} >Vote</button>
            <button onClick={this.next} >Next anecdote</button>
        </div>
        <div>
            <h2>Anecdote with most votes:</h2>
            {this.props.anecdotes[maxIndex]}
            <p> votes: {this.state.votes[maxIndex]} </p>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)