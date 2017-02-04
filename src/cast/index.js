import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { Listeners, Reducer } from './../redux'

import { PlatformSocket } from './../tools/WebSocket'
import { CastReceiver } from './../tools/Cast/Receiver'

import routes from './routes'

const BASE_ADDR = 'localhost:8181'
const NS = 'urn:x-cast:dimples.media'

const STATE = window.__STATE__
const STORE = Reducer(STATE, routerMiddleware(browserHistory))
const HISTORY = syncHistoryWithStore(browserHistory, STORE)

// /* Services */
// let appListener = new Listeners.AppListener(BASE_ADDR, STORE)
// let castListener = new Listeners.CastReceiver(STORE, NS)

// appListener.connect()
// appListener.setAsPresenter()
// castListener.start()


// Chromecast Receiver Observable

// Testing Rx WebSocket
var socket = new PlatformSocket("ws://localhost:8181/connect")

socket.subscribe(
	(x) => {
		console.log('onNext from app', x)
	},
	(e) => {
		console.log('onError from app', e)
	},
	() => {
		console.log('onCompleted from app')
	}
)

var receiver = new CastReceiver(NS)

receiver.subscribe(
	(x) => {
		console.log('onNext from cast receiver')
	},
	(e) => {
		console.log('onError from cast receiver')
	},
	() => {
		console.log('onCompleted from cast receiver')
	}
)



ReactDOM.render(
  <Provider store={STORE}>
    <Router history={HISTORY} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
