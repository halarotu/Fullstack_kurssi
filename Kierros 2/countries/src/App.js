import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      countries: [],
      countriesFiltered: []
    }
    this.handleFilterChange.bind(this)
  }

  componentWillMount() {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise response received')
      this.setState({ countries: response.data })
    })
  }

  handleFilterChange = (event) => {
    const filter = event.target.value
    this.setState({filter: filter})
    this.doFilter(filter)
  }

  handleNameClick = (name) => {
      return (
        () => {
          this.setState({filter: name})
          this.doFilter(name)
        }
      )
  }

  doFilter = (name) => {
    const filtered = this.state.countries.filter(country => country.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
    this.setState({countriesFiltered: filtered})
  }

  render() {
    return (
      <div>
        <Rajaus filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <Valtiot countries={this.state.countriesFiltered} nameClick={this.handleNameClick}/>
      </div>
    )
  }
}

const Rajaus = (props) => {
  return(
        <div>
            find countries: <input value={props.filter}  onChange={props.handleFilterChange}/>
        </div>
  )
}

const Valtiot = (props) => {
  const countryCount = props.countries.length
  let theCountry = {}
  if (countryCount === 1)
    theCountry = props.countries[0]

  return(
    <div>
      { countryCount === 1 &&
        <div>
          <h3>{theCountry.name} {theCountry.nativeName}</h3>
          <div>capital: {theCountry.capital}</div>
          <div>population: {theCountry.population}</div>
          <img src={theCountry.flag} />
        </div>
      }
      { (countryCount > 1 && countryCount < 10) &&
        <ul>
         { props.countries.map(country => <Valtio key={country.name} valtio={country} nameClick={props.nameClick} /> ) }
        </ul>
      }
      { countryCount > 9 &&
        <div>too many matches, specify another filter</div>
      }
    </div>
  )
}

const Valtio = (props) => {
  return(
    <div onClick={props.nameClick(props.valtio.name)}>
      {props.valtio.name}
    </div>
  )
}

export default App;
