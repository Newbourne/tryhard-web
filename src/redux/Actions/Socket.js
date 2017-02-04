import { Socket as C } from './../Constants'

export function setStatus (status) {
  return {
    type: C.SET_STATUS,
    value: status
  }
}

export function setError (error) {
  return {
    type: C.ERROR,
    value: error
  }
}

export function sendMessage (msg) {
  return {
    type: C.MESSAGE,
    value: msg
  }
}
export function receivedMessage (msg) {
  return {
    type: C.RESPONSE,
    value: msg
  }
}
