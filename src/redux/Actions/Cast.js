import { Cast as C } from './../Constants'

/* Cast Messages */
export function setStatus (status) {
  return {
    type: C.SET_STATUS,
    value: status
  }
}
export function requestSession () {
  return {
    type: C.REQUEST_SESSION
  }
}
export function sendMessage (msg) {
  return {
    type: C.MESSAGE,
    value: JSON.stringify(msg)
  }
}
export function setError (error) {
  return {
    type: C.ERROR,
    value: error
  }
}
