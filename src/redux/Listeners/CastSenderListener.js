import { ReduxBase } from './../Common'
import { Cast as C } from './../Constants'
import { Cast as A, System } from './../Actions'
import { RxCastSender } from 'tryhard-cast'

class CastSenderListener extends ReduxBase {
  constructor (store, appId, namespace) {
    super(store)
    this.subscription = new RxCastSender({
      applicationId: appId,
      namespace: namespace,

      // API Init Obs
      initObs: { 
        next: (e) => { this.dispatch(A.setStatus(C.INIT_COMPLETE)) } 
      },

      // Sender+Receiver Connection Obs
      connObs: {
        next: (e) => { 
          if (e === 0) this.dispatch(A.setStatus(C.DISCONNECTED))
          if (e === 1) this.dispatch(A.setStatus(C.CONNECTED))
        }
      },

      // Chromecast Availability Obs
      receiverObs: {
        next: (e) => {
          if (e === 0) this.dispatch(A.setStatus(C.NOT_AVAILABLE))
          if (e === 1) this.dispatch(A.setStatus(C.AVAILABLE))
        }
      },

      // Manual Shutdown Obs
      closeObs: {
        next: (e) => { this.dispatch(A.setStatus(C.DISCONNECTED)) },
        error: (e) => { /* close error */ }
      },

      // Sender Messaging Obs
      sendMessageObs: {
        next: (e) => { /* succesfully sent message */ },
        error: (e) => { /* failed sending message */ }
      }
    })

    this.store.subscribe(() => this.reduxListener())
  }
  connect () {
    this.subscription.subscribe({
      next: (e) => { /* we aren't doing anything with messaging atm */ },
      error: (e) => { this.dispatch(A.setError(e.description)) },
      complete: () => { }
    })
  }
  dispatch (action) {
    return this.store.dispatch(action)
  }
  shutdown () {
    this.subscription.stop(this.config.closeObs)
  }
  sendMessage (message) {
    this.subscription.next(message)
  }
  reduxListener () {
    const { LastAction } = this.store.getState()
    switch (LastAction.type) {
      case C.CONNECT:
        return this.connect()
      case C.MESSAGE:
        return this.sendMessage(JSON.stringify(LastAction.value))
      default:
        break
    }
  }

}

export default CastSenderListener