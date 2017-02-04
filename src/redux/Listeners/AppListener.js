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
import { Init } from './../../api'

export default class AppListener extends ReduxBase {
  constructor (baseUrl, store) {
    super(store)
    let api = Init(baseUrl)
    this.apiClient = api.client
    this.apiSocket = api.socket
  }
  reduxListener () {
    const { LastAction } = this.store.getState()

    switch (LastAction && LastAction.type) {
      case SocketConstants.MESSAGE:
        this.postMessage(JSON.stringify(LastAction.value))
        break
      case SocketConstants.RESPONSE:
        switch (LastAction.value.command) {
          case PartyConstants.CONNECTED:
            this.dispatch(PartyActions.setStatus(LastAction.value.command))
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
  // non-Exponential Backoff
  // every 2 seconds for now
  connect () {
    this.store.subscribe(() => this.reduxListener())

    this.apiSocket.onopen = (event) => {
      this.dispatch(SocketActions.setStatus(SocketConstants.CONNECTED))
      this.internalReconnect()
    }

    this.apiSocket.onmessage = (data) => {
      this.dispatch(SocketActions.receivedMessage(data))
      this.internalReconnect()
    }

    this.apiSocket.onerror = (event) => {
      this.dispatch(SocketActions.setStatus(SocketConstants.FAILED))
      this.dispatch(PartyActions.setStatus(PartyConstants.DISCONNECTED))
      this.dispatch(SocketActions.setError(event))
    }

    this.apiSocket.onclose = (event) => {
      this.dispatch(SocketActions.setStatus(SocketConstants.DISCONNECTED))
      this.dispatch(PartyActions.setStatus(PartyConstants.DISCONNECTED))
    }

    this.apiSocket.connect()
  }
  postMessage (msg) {
    this.apiSocket.send(msg)
  }
  close () {
    this.apiSocket.close()
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
