import { System as C } from './../Constants'

import ApiClient from './../../tools/ApiClient'

export function setProcessing (state) {
  return {
    type: C.SET_PROCESSING,
    value: state
  }
}
export function setError (error) {
  return {
    type: C.ERROR,
    value: error
  }
}
export function updateApps (apps) {
  return {
    type: C.GET_APPS,
    value: apps
  }
}
export function updateApp (app) {
  return {
    type: C.GET_APP,
    value: app
  }
}
export function getApps () {
  return dispatch => {
    var client = new ApiClient()
    dispatch(setProcessing(true))
    client.getApps()
      .then((res) => {
        console.log('received apps', res)
        dispatch(updateApps(res))
        dispatch(setProcessing(false))
      })
      .catch((err) => {
        dispatch(setError(err))
        dispatch(setProcessing(false))
      })
  }
}

export function getApp (id) {
  return dispatch => {
    var client = new ApiClient()
    dispatch(setProcessing(true))
    client.getApp(id)
      .then((res) => {
        dispatch(updateApp(res))
        dispatch(setProcessing(false))
      })
      .catch((err) => {
        dispatch(setError(err))
        dispatch(setProcessing(false))
      })
  }
}

