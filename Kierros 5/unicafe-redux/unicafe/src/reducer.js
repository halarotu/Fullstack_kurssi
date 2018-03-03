const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        let goodCount = state.good + 1
        return {good: goodCount, ok: state.ok, bad: state.bad}
      case 'OK':
        let okCount = state.ok + 1
        return {good: state.good, ok: okCount, bad: state.bad}
      case 'BAD':
        let badCount = state.bad + 1
        return {good: state.good, ok: state.ok, bad: badCount}
      case 'ZERO':
        return initialState
    }
    return state
  }
  
  export default counterReducer