import { ReduxBase } from './../Common'
import { Cast as C } from './../Constants'
import { Cast as A, System } from './../Actions'

let chrome = window.chrome

function appendMessage (message) {
  console.log(message)
}

let limit = 5;
let counter = 0;

class CastSender extends ReduxBase {
  constructor (store, appId, namespace) {
    super(store)
    this.applicationID = appId
    this.namespace = namespace
    this.session = null
  }
  dispatch (action) {
    return this.store.dispatch(action)
  }
  start () {
    // loop every 1 second until Chromecast is loaded
    var loadCastInterval = setInterval((ctx) => {
      if (chrome && chrome.cast && chrome.cast.isAvailable) {
        // Chromecast loaded
        clearInterval(loadCastInterval)
        ctx.initializeCastApi()
      } else if (counter >= limit) {
        console.log('suppressed cast check')
        clearInterval(loadCastInterval)
      }
      counter += 1
    }, 1000, this)
    this.store.subscribe(() => this.reduxListener())
  }
  initializeCastApi () {
    var sessionRequest = new chrome.cast.SessionRequest(this.applicationID)

    var apiConfig = new chrome.cast.ApiConfig(
            sessionRequest,
            this.sessionListener.bind(this),
            this.receiverListener.bind(this))

    chrome.cast.initialize(
            apiConfig,
            this.onInitSuccess.bind(this),
            this.onError.bind(this))
  }
  requestSession () {
    chrome.cast.requestSession(
            this.sessionListener.bind(this),
            this.onError.bind(this)
        )
  }
  stopApp () {
    this.session.stop(
            this.onStopAppSuccess.bind(this),
            this.onError.bind(this))
  }
  onInitSuccess () {
    this.dispatch(A.setStatus(C.INIT_COMPLETE))
  }
  onSendMessageSuccess (message) {
    appendMessage('onSuccess: ' + message)
  }
  onStopAppSuccess () {
    appendMessage('onStopAppSuccess')
    this.dispatch(A.setStatus(C.DISCONNECTED))
  }
  onError (message) {
    appendMessage('onError: ' + JSON.stringify(message))
    this.dispatch(A.setError(message.description))
  }
  sessionListener (e) {
    appendMessage('New session ID:' + e.sessionId)
    var updateListener = this.sessionUpdateListener.bind(this)
    this.session = e
    this.session.addUpdateListener(updateListener)
    this.session.addMessageListener(this.namespace, this.receiveSessionMessage.bind(this))
    this.dispatch(A.setStatus(C.CONNECTED))
  }
  sessionUpdateListener (isAlive) {
    if (!isAlive) {
      this.session = null
      this.dispatch(A.setStatus(C.DISCONNECTED))
      return
    }
    var message = isAlive ? 'Session Updated' : 'Session Removed'
    message += ': ' + this.session.sessionId
    appendMessage(message)
  }
  receiverListener (e) {
    if (e === 'available') {
      this.dispatch(A.setStatus(C.AVAILABLE))
    } else {
      this.dispatch(A.setStatus(C.NOT_AVAILABLE))
    }
  }
  reduxListener () {
    const { LastAction } = this.store.getState()
    switch (LastAction.type) {
      case C.REQUEST_SESSION:
        return this.requestSession()
      case C.MESSAGE:
        return this.sendMessage(JSON.stringify(LastAction.value))
      default:
        break
    }
  }
  sendMessage (message) {
    if (this.session != null) {
      this.session.sendMessage(
                this.namespace,
                message,
                this.onSendMessageSuccess.bind(this, 'Message sent: ' + message),
                this.onError.bind(this))
    } else {
      chrome.cast.requestSession(function (e) {
        this.sessionListener(e)
        this.session.sendMessage(
                    this.namespace,
                    message,
                    this.onSendMessageSuccess.bind(this),
                    this.onError.bind(this))
      },
                this.onError.bind(this))
    }
  }
  receiveSessionMessage (msg) {
    appendMessage('received message ' + msg)
  }
}

export default CastSender
