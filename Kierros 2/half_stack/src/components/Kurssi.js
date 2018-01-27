import React from 'react';

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>

const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>

const Sisalto = (props) => {
  return(
    <div>
        <ul>
            {props.kurssi.osat.map( osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />) }
        </ul>
    </div>
  )
}

const Yhteensa = (props) => {
  const yhteensa = props.kurssi.osat.reduce((summa, osa) => summa + osa.tehtavia, 0)
  
  return(
    <p>yhteensä {yhteensa} tehtävää</p>
  )
}

const Kurssi = (props) => {
    return(
    <div>
      <Otsikko kurssi={props.kurssi}/>
      <Sisalto kurssi={props.kurssi} />
      <Yhteensa kurssi={props.kurssi}  />
    </div>
    )
}

export default Kurssi;
