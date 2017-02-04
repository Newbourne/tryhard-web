import { Storage } from './../Common'
import { Party, Socket } from './../Constants'

import * as System from './System'
import { ApiClient } from './../../api'

export function setCode (code) {
  return {
    type: Party.SET_CODE,
    value: code
  }
}
export function setStatus (status) {
  return {
    type: Party.SET_STATUS,
    value: status
  }
}
export function hostLobby (code) {
  return dispatch => {
    var client = new ApiClient()
    dispatch(System.setProcessing(true))
    client.getLobbyCode(code)
      .then((res) => {
        Storage.set(Party.STORAGE_CODE, res)
        dispatch(setCode(res))
        dispatch(System.setProcessing(false))
      })
      .catch((err) => {
        dispatch(System.setError(err))
        dispatch(System.setProcessing(false))
      })
  }
}
export function join (partyCode, username, isHost, isPresenter) {
  return {
    type: Socket.MESSAGE,
    value: {
      command: Party.CONNECT,
      player: {
        party_code: partyCode,
        username: username
        // is_host: isHost,
        // is_presenter: isPresenter
      }
    }
  }
}
export function leave () {
  return {
    type: Socket.MESSAGE,
    value: {
      command: Party.DISCONNECT
    }
  }
}
export function addPlayer (player) {
  return {
    type: Party.ADD_PLAYER,
    value: {
      id: player.id,
      username: player.username
    }
  }
}
export function dropPlayer (player) {
  return {
    type: Party.DROP_PLAYER,
    value: {
      id: player.id,
      username: player.username
    }
  }
}
