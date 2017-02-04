import Rx from 'rx'

let cast = window.cast

const STATUS_CONNECTED = 'STATUS_CONNECTED'

/*
  Chromecast Receiver Observer.
  The only message that is emitted is from onReady (connected)
  The rest of the platform is managed via WebSockets.

  - ToDo
    - Add automatic retry. cast_receiver is going to retry automatically. (2-4-8-16-32-X)
      this observable should be inline with that functionality.
*/

class CastReceiverDisposable {
  constructor(receiver, messageBus, readyFn, connectedFn, disconnectedFn, messageFn){
    this.cast = receiver
    this.messageBus= messageBus
    this.readyFn = readyFn
    this.connectedFn = connectedFn
    this.disconnectedFn = disconnectedFn
    this.messageFn = messageFn
    this.isDisposed = false
  }
  dispose() {
    if (!this.isDisposed) {
      this.isDisposed = true

      this.cast.removeEventListener('onReady', this.readyFn, false)
      this.cast.removeEventListener('onSenderConnected', this.connectedFn, false)
      this.cast.removeEventListener('onSenderDisconnected', this.disconnectedFn, false)
      this.messageBus.removeEventListener('onMessage', this.messageFn, false)
    }    
  }  
}

export default class CastReceiverObservable {
  constructor (namespace) {
    this.namespace = namespace
    this.messageBus = null
    this.cast = null
     
    return Rx.Observable.create(obs => {
      // setup ChromeCast Receiver
      cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG)

      // get receiver manager
      this.cast = cast.receiver.CastReceiverManager.getInstance()
      console.log('Starting Receiver Manager')

      var onReadyHandler = this.createOnReady(obs, this.cast)
      var onSenderConnectedHandler = this.createOnSenderConnected(this.cast)
      var onSenderDisconnectedHandler = this.createOnSenderDisconnected()
      
      this.cast.addEventListener('onReady', onReadyHandler, false)
      this.cast.addEventListener('onSenderConnected', onSenderConnectedHandler, false)
      this.cast.addEventListener('onSenderDisconnected', onSenderDisconnectedHandler, false)

      // Setup Receiver MessageBus even though we do not use it.
      var onMessageHandler = this.createOnMessage(this.messageBus)

      // create a CastMessageBus to handle messages for a custom namespace
      this.messageBus = this.cast.getCastMessageBus(this.namespace)

      // handler for the CastMessageBus message event
      this.messageBus.addEventListener('onMessage', onMessageHandler, false)

      // initialize the CastReceiverManager with an application status message
      this.cast.start({
        statusText: 'DimplesMedia'
      })

      console.log('Receiver Manager started')   

      return new CastReceiverDisposable(this.state.socket, msgHandler, errHandler, closeHandler, this.close);
    })
  }
  createOnReady(obs, receiver) {
    return (e) => {
      console.log('Received Ready event: ' + JSON.stringify(e.data))
      receiver.setApplicationState('Connect to ', e.data)
      // notify 
      obs.onNext(JSON.stringify({'status': STATUS_CONNECTED}))
    }
  }
  createOnSenderConnected(c) {
    return (e) => {
      console.log('Received Sender Connected event: ' + e.data)
      console.log(c.getSender(e.data).userAgent)  
    }  
  }
  createOnSenderDisconnected() {
    return (e) => {
      console.log('Received Sender Disconnected event: ' + e.data)
    }
  }
  createOnMessage(m){
    return (e) => {
      console.log('Message [' + e.senderId + ']: ' + e.data)
      m.send(e.senderId, e.data) 
    }   
  }
}
