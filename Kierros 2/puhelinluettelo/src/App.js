import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' } 
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
    this.handleFilterChange.bind(this)
    this.handleNameChange.bind(this)
    this.handleNumberChange.bind(this)
    this.addNew.bind(this)
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  addNew = (event) => {
      event.preventDefault()

      if (this.state.persons.filter(person => person.name === this.state.newName).length === 0) {
            const persons = this.state.persons.concat({name: this.state.newName, number: this.state.newNumber})
            this.setState({persons, newName: '', newNumber: ''})
      } else {
          alert('Nimi on jo puhelinluettelossa!')
      }
  }

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) != -1)
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        
        <Rajaus filter={this.state.filter} handleFilterChange={this.handleFilterChange} />

        <LisaaUusi newName={this.state.newName} newNumber={this.state.newNumber} 
            handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} 
            addNew={this.addNew}/>
        
        <h2>Numerot</h2>
        <table>
            <tbody>
                {personsToShow.map(person => <Henkilo key={person.name} name={person.name} number={person.number} />)}
            </tbody>
        </table>
      </div>
    )
    }
}

const Rajaus = (props) => {
    return(
        <form>
            <div>
                rajaa näytettäviä: <input value={props.filter}  onChange={props.handleFilterChange}/>
            </div>
        </form>
    )
}

const LisaaUusi = (props) => {
    return(
        <form onSubmit={props.addNew} >
            <h3>Lisää uusi:</h3>
            <div>
                nimi: <input value={props.newName}  onChange={props.handleNameChange}/>
            </div>
            <div>
                numero: <input value={props.newNumber}  onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

const Henkilo = (props) => {
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.number}</td>
        </tr>
    )
}

export default App