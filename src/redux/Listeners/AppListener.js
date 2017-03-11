import { ReduxBase, Storage } from './../Common'

import {
  Player as PlayerConstants,
  Party as PartyConstants,
  System as SystemConstants,
  Socket as SocketConstants
} from './../Constants'

import {
  Player as PlayerActions,
  Party as PartyActions,
  System as SystemActions,
  Socket as SocketActions
} from './../Actions'

import TryHardWebSocket from 'tryhard-websocket'

/*
  AppListener
  Redux service integrator for platform api/websocket.
*/
export default class AppListener extends ReduxBase {
  constructor (baseUrl, store) {
    super(store)
    this.socket = new TryHardWebSocket({
      url: "ws://" + baseUrl + "/connect",
      protocol: null,
      enableHeartbeat: true,
      openObs: {
        next: x => { 
          this.dispatch(SocketActions.setStatus(SocketConstants.CONNECTED))
          this.internalReconnect()
        },
        error: x => x,
        complete: x => x
      },
      closeObs: {
        next: () => {
          this.dispatch(SocketActions.setStatus(SocketConstants.DISCONNECTED))
          this.dispatch(PartyActions.setStatus(PartyConstants.DISCONNECTED))
        },
        error: x => x,
        complete: x => x,
      }
    })
  }
  reduxListener () {
    const { LastAction } = this.store.getState()

    switch (LastAction && LastAction.type) {
      case SocketConstants.MESSAGE:
        this.sendMessage(LastAction.value)
        break
      case SocketConstants.RESPONSE:
        switch (LastAction.value.command) {
          case PartyConstants.CONNECTED:
            this.dispatch(PartyActions.setStatus(LastAction.value.command))
            // syncs connected players on player connect
            var players = LastAction.value.players
            if (players) {
              for (var i = 0; i < players.length; i++) {
                this.dispatch(PartyActions.addPlayer(players[i]))
              }
            }
            break
          case PartyConstants.DISCONNECTED:
          case PartyConstants.NOT_AVAILABLE:
            this.dispatch(PartyActions.setStatus(LastAction.value.command))
            break
          case PartyConstants.PLAYER_JOINED:
            this.dispatch(PartyActions.addPlayer(LastAction.value.player))
            break
          case PartyConstants.PLAYER_LEFT:
            this.dispatch(PartyActions.dropPlayer(LastAction.value.player))
            break
        }
        break
      default:
        break
    }
    // this.internalReconnect()
  }
  connect() {
    this.store.subscribe(() => this.reduxListener())
    this.socket.connect()
    this.socket.subscribe({
      next: msg => {
        this.dispatch(SocketActions.receivedMessage(JSON.parse(msg.data)))
      },
      error: err => {
        this.dispatch(SocketActions.setStatus(SocketConstants.FAILED))
        this.dispatch(PartyActions.setStatus(PartyConstants.DISCONNECTED))
        this.dispatch(SocketActions.setError(err))
      },
      complete: () => {
        this.dispatch(SocketActions.setStatus(SocketConstants.DISCONNECTED))
        this.dispatch(PartyActions.setStatus(PartyConstants.DISCONNECTED))
      }
    })
  }
  sendMessage (msg) {
    this.socket.sendJson(msg)
  }
  close () {
    this.socket.close()
  }
  // automatic rejoin presenter\client
  internalReconnect () {
    const { Player, Party, Socket } = this.store.getState()
    if (Socket.status === SocketConstants.CONNECTED &&
        Party.code &&
        Party.code.length > 0 &&
        Player.username &&
        Player.username.length > 0 &&
        Party.status === PartyConstants.DISCONNECTED) {
      this.dispatch(PartyActions.join(Party.code, Player.username, Player.isHost, Player.isPresenter))
    }
  }
  setAsPresenter () {
    this.dispatch(PlayerActions.setPresenter(true))
    this.dispatch(PlayerActions.setUsername('PRESENTER'))
    var code = Storage.get(PartyConstants.STORAGE_CODE)
    if (this.store.getState().Party.code == null && !code) {
      this.dispatch(PartyActions.hostLobby())
    } else {
      this.dispatch(PartyActions.hostLobby(code))
    }
  }
}
