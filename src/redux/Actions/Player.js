import { Player as C } from './../Constants'

export function setUsername (username) {
  return {
    type: C.SET_USERNAME,
    value: username
  }
}
export function setHost (status) {
  return {
    type: C.SET_HOST,
    value: status
  }
}
export function setPresenter (status) {
  return {
    type: C.SET_PRESENTER,
    value: status
  }
}
