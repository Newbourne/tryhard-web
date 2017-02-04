import { Player as C } from './../Constants'

const initialState = {
  username: null,
  isHost: true,
  isPresenter: false
}

export default function Reducer (state = initialState, action) {
  switch (action.type) {

    case C.SET_USERNAME:
      return Object.assign({}, state, {
        username: action.value
      })

    case C.SET_HOST:
      return Object.assign({}, state, {
        isHost: action.value
      })

    case C.SET_PRESENTER:
      return Object.assign({}, state, {
        isPresenter: action.value
      })

    default:
      return state
  }
}
