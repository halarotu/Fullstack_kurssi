import React from 'react';
import PersonService from './services/PersonService'
import './app.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: ''
    }
    this.handleFilterChange.bind(this)
    this.handleNameChange.bind(this)
    this.handleNumberChange.bind(this)
    this.addNew.bind(this)
  }

  componentWillMount() {    
    PersonService.getAll()
        .then(response => {
            console.log('promise response received')
            this.setState({ persons: response })
        })
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

    const searchResult = this.state.persons.filter(person => person.name === this.state.newName)

    if (searchResult.length === 0) {
        const newPerson = {name: this.state.newName, number: this.state.newNumber}
        PersonService.create(newPerson)
            .then(response => {
                const persons = this.state.persons.concat(response)
                this.setState({persons, newName: '', newNumber: '', message: 'Uusi henkilö lisätty!'})
                setTimeout(() => {
                    this.setState({message: null})
                  }, 5000)
            })
    } else {
        if(window.confirm('Nimi on jo luettelossa. Haluatko päivittää numeron?')) {
            const person = searchResult[0]
            console.log('Päivitä numero id:lle ' + person.id)
            const newPerson = {...person, number: this.state.newNumber}
            PersonService.update(person.id, newPerson)
                .then(newPerson => {
                    const persons = this.state.persons.filter(p => p.id !== person.id)
                    this.setState({persons: persons.concat(newPerson), newName: '', newNumber: '',
                        message: 'Henkilön tiedot päivitetty!'})
                    setTimeout(() => {
                        this.setState({message: null})
                        }, 5000)
                })
                .catch(error => {
                    this.setState({message: 'Henkilön tietoja ei ole enää olemassa!'})
                    PersonService.getAll()
                        .then(response => {
                            console.log('promise response received')
                            this.setState({ persons: response })
                        })
                    
                    setTimeout(() => {
                        this.setState({message: null})
                        }, 5000)
                })
        }
    }
  }

  remove = (id) => {
      return ( () => {
        if (window.confirm('Haluatko varmasti poistaa henkilön?')) {
            console.log('remove id ' + id)
            PersonService.remove(id)
                .then(response => {
                    const persons = this.state.persons.filter(person => person.id !== id)
                    this.setState({persons, message: 'Henkilö poistettu!'})
                    setTimeout(() => {
                        this.setState({message: null})
                      }, 5000)
                })
        }
      })
  } 

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>

        <Ilmoitus message={this.state.message} />
        
        <Rajaus filter={this.state.filter} handleFilterChange={this.handleFilterChange} />

        <LisaaUusi newName={this.state.newName} newNumber={this.state.newNumber} 
            handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} 
            addNew={this.addNew} />
        
        <h2>Numerot</h2>
        <table>
            <tbody>
                {personsToShow.map(person => <Henkilo key={person.name} name={person.name} 
                    number={person.number} id={person.id} remove={this.remove}/>)}
            </tbody>
        </table>
      </div>
    )
    }
}

const Ilmoitus = (props) => {
    return(
        <div className="errorBox" >
            {props.message}
        </div>
    )
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
            <td><button onClick={props.remove(props.id)} >Poista</button></td>
        </tr>
    )
}

export default App