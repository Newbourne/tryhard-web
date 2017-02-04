// import SocketObservable from './../src/tools/WebSocket/SocketObservable'

// describe('Socket Observable', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
// 		/*
// 		    Notes:
// 		        Will not connect until subscribed. (this is cool)
// 		*/
// 		var state = {
// 		  socket: null
// 		}
// 		var socket = new SocketObservable(
// 		    state,
// 		    'ws://localhost:8080',
// 		    null)
// 		var subscription = socket.subscribe(
// 		    x => console.log(`onNext: ${x}`, x),
// 		    e => console.log(`onError: ${e}`, e),
// 		    () => console.log('onCompleted'))

// 		console.log('subscription', subscription)
//     });
//   });
// });