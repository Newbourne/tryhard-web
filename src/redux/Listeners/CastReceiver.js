// import { ReduxBase } from './../Common'
// import { Cast as C } from './../Constants'
// import { Cast as A } from './../Actions'

// let cast = window.cast

// class CastReceiver extends ReduxBase {
//   constructor (store, namespace) {
//     super(store)
//     this.namespace = namespace
//     this.castReceiverManager = null
//     this.messageBus = null
//   }
//   start () {
//         // setup ChromeCast Receiver
//     cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG)

//         // get receiver manager
//     this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance()
//     console.log('Starting Receiver Manager')

//         // handler for the 'ready' event
//     this.castReceiverManager.onReady = function (event) {
//       console.log('Received Ready event: ' + JSON.stringify(event.data))
//       this.castReceiverManager.setApplicationState('Connect to ', event.data)
//       this.dispatch(A.setStatus(C.CONNECTED))
//     }

//         // handler for 'senderconnected' event
//     this.castReceiverManager.onSenderConnected = function (event) {
//       console.log('Received Sender Connected event: ' + event.data)
//       console.log(this.castReceiverManager.getSender(event.data).userAgent)
//     }

//         // handler for 'senderdisconnected' event
//     this.castReceiverManager.onSenderDisconnected = function (event) {
//       console.log('Received Sender Disconnected event: ' + event.data)
//             // if (window.castReceiverManager.getSenders().length == 0) {
//             //     window.close();
//             // }
//     }

//         // create a CastMessageBus to handle messages for a custom namespace
//     this.messageBus = this.castReceiverManager.getCastMessageBus(this.namespace)

//         // handler for the CastMessageBus message event
//     this.messageBus.onMessage = function (event) {
//       console.log('Message [' + event.senderId + ']: ' + event.data)
//             // display the message from the sender

//             // displayText(event.data);

//             // inform all senders on the CastMessageBus of the incoming message event
//             // sender message listener will be invoked
//       this.messageBus.send(event.senderId, event.data)
//     }

//         // initialize the CastReceiverManager with an application status message
//     this.castReceiverManager.start({
//       statusText: 'DimplesMedia'
//     })
//     console.log('Receiver Manager started')
//   }
// }
// export default CastReceiver
