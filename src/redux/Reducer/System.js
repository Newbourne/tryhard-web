import { Socket as SOCKET, Cast as CAST, System as SYS } from './../Constants'

const initialState = {
  apps: [],
  app: null,
  isProcessing: false,
  isLoading: true,
  loadingText: 'Loading...',
  isError: false,
  error: null
}

export default function Reducer (state = initialState, action) {
  switch (action.type) {

    case SYS.GET_APPS:
      return Object.assign({}, state, {
        apps: action.value
      })

    case SYS.GET_APP:
      return Object.assign({}, state, {
        app: action.value
      })

    case SOCKET.SET_STATUS:
      if (action.value !== SOCKET.CONNECTED) {
        return Object.assign({}, state, {
          isLoading: true,
          loadingText: 'Loading...'
        })
      } else {
        return Object.assign({}, state, {
          isLoading: false,
          loadingText: null
        })
      }

    case SYS.ERROR:
    case CAST.ERROR:
    case SOCKET.ERROR:
      return Object.assign({}, state, {
        isError: true,
        error: action.value
      })

    case SYS.SET_PROCESSING:
      return Object.assign({}, state, {
        isProcessing: action.value
      })

    default:
      return state
  }
}
