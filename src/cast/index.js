import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { Listeners, Reducer } from './../redux'
import routes from './routes'

/* Config */
const BASE_ADDR = 'localhost:8181'
const NS = 'urn:x-cast:dimples.media'

/* Redux Setup */
const STATE = window.__STATE__
const STORE = Reducer(STATE, routerMiddleware(browserHistory))
const HISTORY = syncHistoryWithStore(browserHistory, STORE)

/* Services */
let appListener = new Listeners.AppListener(BASE_ADDR, STORE)
//let castListener = new Listeners.CastReceiverListener(STORE, NS)

appListener.connect()
appListener.setAsPresenter()
//castListener.connect()

ReactDOM.render(
  <Provider store={STORE}>
    <Router history={HISTORY} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
