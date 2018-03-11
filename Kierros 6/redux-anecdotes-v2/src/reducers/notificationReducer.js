const initialNotification = ''

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.message
  default:
    return state
  }
}

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    message: message 
  }
}

export const notifyWithInterval = (message, time) => {
  return async (dispatch) => {
    dispatch(notify(message))
    await setTimeout(() => {
      dispatch(notify(''))
    }, time * 1000)
  }
}


export default notificationReducer