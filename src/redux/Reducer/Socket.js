import { Socket as C } from './../Constants'

const initialState = {
  status: C.DISCONNECTED,
  error: null
}

export default function Reducer (state = initialState, action) {
  switch (action.type) {

    case C.SET_STATUS:
      return Object.assign({}, state, {
        status: action.value
      })

    case C.ERROR:
      let newState = Object.assign({}, state, {
        error: action.value
      })
      return newState

    default:
      return state
  }
}
