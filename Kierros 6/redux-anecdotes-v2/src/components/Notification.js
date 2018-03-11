import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const message = this.props.message

    return (
      <div>
        {message === '' ?
          <div></div> :
          <div style={style}>
            {message}
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notifications
  }
}

export default connect(
  mapStateToProps
)(Notification)
