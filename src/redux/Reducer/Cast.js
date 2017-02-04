import { Cast as C } from './../Constants'

const initialState = {
  status: C.CONNECTED, // switch to DISCONNECTED when live
  error: null
}

export default function Reducer (state = initialState, action) {
  switch (action.type) {
    case C.SET_STATUS:
      return Object.assign({}, state, {
        status: action.value
      })
    case C.ERROR:
      return Object.assign({}, state, {
        error: action.value
      })
    default:
      return state
  }
}
