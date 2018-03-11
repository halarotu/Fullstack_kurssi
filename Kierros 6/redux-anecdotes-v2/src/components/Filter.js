import React from 'react'
import {filter} from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  
  filterChange = (e) => {
    console.log(e.target.value)
    this.props.filter(e.target.value)
  }
  
  render() {
    const style = {
      marginBottom: 10
    }
    return(
      <div style={style}>
        filter: <input name="filter" onChange={this.filterChange} />
      </div>
    )
  }
}

export default connect(
  null,
  {filter}
)(Filter)
