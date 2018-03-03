import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'


const store = createStore(counterReducer)

const nollaa = () => () => {
  store.dispatch({ type: 'ZERO'})
}

const Statistiikka = () => {
  const palautteet = store.getState()
  const palautteita = palautteet.good + palautteet.ok + palautteet.bad
  const keskiarvo = (palautteet.good - palautteet.bad) / palautteita
  const positiivisia = palautteet.good / palautteita * 100


  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteet.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteet.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteet.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={nollaa()} >nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi})
  }

  render() {
    console.log(store.getState())
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
export default App
