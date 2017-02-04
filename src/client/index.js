import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'
import { Listeners, Reducer } from './../redux'

import Rx from 'rx'
import { CastSender } from './../tools/Cast/Sender'

import routes from './routes'

const BASE_ADDR = 'localhost:8181'
const NS = 'urn:x-cast:dimples.media'
const APP_ID = '66D812A1'

const STATE = window.__STATE__
const STORE = Reducer(STATE, routerMiddleware(browserHistory))
const HISTORY = syncHistoryWithStore(browserHistory, STORE)

/* Services */
// let appListener = new Listeners.AppListener(BASE_ADDR, STORE)
// let castListener = new Listeners.CastSender(STORE, APP_ID, NS)

// appListener.connect()
// castListener.start()

var state = {
  session: null
}
var sender = new CastSender(state, APP_ID, NS)

sender
  .subscribe(
  	(x) => {
  		console.log('onNext from cast sender', x)
  	},
  	(e) => {
  		console.log('onError from cast sender', e)
  	},
  	() => {
  		console.log('onCompleted from cast sender')
  	}
)

ReactDOM.render(
  <Provider store={STORE}>
    <Router
      history={HISTORY}
      routes={routes} />
  </Provider>,
  document.getElementById('app')
)
