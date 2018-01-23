import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          hyva: 0,
          neutraali: 0,
          huono: 0
        }
    }

    asetaPalaute = (nimi) => {
        return (
            () => {
                let arvo = this.state[nimi] + 1
                if (nimi === 'hyva')
                    this.setState({hyva: arvo})
                else if (nimi === 'neutraali')
                    this.setState({neutraali: arvo})
                else if (nimi === 'huono')
                    this.setState({huono: arvo})
            }
        )
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Anna palautetta!</h3>
                </div>
                
                <div>
                    <Button teksti={"Hyvä"} onClick={this.asetaPalaute('hyva')} />
                    <Button teksti={"Neutraali"} onClick={this.asetaPalaute('neutraali')} />
                    <Button teksti={"Huono"} onClick={this.asetaPalaute('huono')} />
                </div>

                <Statistics hyva={this.state.hyva} huono={this.state.huono} neutraali={this.state.neutraali} />
            </div>
        )
    }
}

const Button = ({teksti, onClick}) => {
    return (
        <button onClick={onClick} >{teksti}</button>
    )
}

const Statistics = ({hyva, huono, neutraali}) => {
    const ka = hyva+huono+neutraali === 0 ? 0 : (hyva-huono) / (hyva + huono + neutraali)
    const pos = hyva+huono+neutraali === 0 ? 0 : (hyva) / (hyva + huono + neutraali)
    return (
        hyva+huono+neutraali === 0 ?
        <div> 
            <p>Palautetta ei ole vielä annettu</p>
        </div>
        :
        <div>
            <h4>Statistiikka:</h4>
            <table>
                <tbody>
                    <Statistic teksti={"Hyvä"} arvo={hyva} />
                    <Statistic teksti={"Neutraali"} arvo={neutraali} />
                    <Statistic teksti={"Huono"} arvo={huono} />
                    <Statistic teksti={"Keskiarvo"} arvo={ka} />
                    <Statistic teksti={"Positiivisia"} arvo={pos} />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({teksti, arvo}) => {
    return (
        <tr>
            <td>{teksti}</td><td>{arvo}</td>
        </tr>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
