import { ReduxBase } from './../Common'
import { Cast as C } from './../Constants'
import { Cast as A } from './../Actions'
import { RxCastReceiver } from 'tryhard-cast'

let cast = window.cast

const socketCfg = {
  namespace: null,
  readyObs: null,
  senderConnectedObs: null,
  senderDisconnectedObs: null,
  standbyChangedObs: null,
  systemVolumeChangedHandler: null,
  visibilityChangedHandler: null,
    // DEBUG
    // VERBOSE
    // INFO
    // WARNING
    // ERROR
    // NONE
  logLevel: 'NONE',
    // STRING
    // JSON
    // CUSTOM
  messageType: 'JSON'
}

class CastReceiverListener extends ReduxBase {
  constructor (store, namespace) {
    super(store)
    this.namespace = namespace
    this.subscription = new RxCastReceiver({
      namespace: namespace, 
      readyObs: {
        next: (e) => { this.dispatch(A.setStatus(C.CONNECTED)) }
      },
      senderConnectedObs: {
        next: (e) => { /* sender connected */ }
      },
      senderDisconnectedObs: {
        next: (e) => { /* sender disconnected */ }
      },
      standbyChangedObs: {
        next: (e) => { /* receiver standby changed */ }
      },
      systemVolumeChangedHandler: {
        next: (e) => { /* receiver volume changed  */ }
      },
      visibilityChangedHandler: {
        next: (e) => { /* receiver visibility changed */ }
      }
    })
  }
  connect () {
    this.subscription.subscribe({
      next: (e) => { /* we aren't doing anything with messaging atm */ },
      error: (e) => { this.dispatch(A.setError(e)) },
      complete: () => { /* complete */ }
    })
  }
  send(senderId, message){
    this.subscription.send(senderId, message)
  }
  broadcast(message){
    this.subscription.broadcast(message)
  }
}
export default CastReceiverListener
