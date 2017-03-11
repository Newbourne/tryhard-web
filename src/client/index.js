import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'
import { Listeners, Reducer } from './../redux'
import routes from './routes'

/* Config */
const BASE_ADDR = 'localhost:8181'
const NS = 'urn:x-cast:dimples.media'
const APP_ID = '66D812A1'

/* Redux Setup */
const STATE = window.__STATE__
const STORE = Reducer(STATE, routerMiddleware(browserHistory))
const HISTORY = syncHistoryWithStore(browserHistory, STORE)

/* Services */
let appListener = new Listeners.AppListener(BASE_ADDR, STORE)
let castListener = new Listeners.CastSenderListener(STORE, APP_ID, NS)

appListener.connect()
castListener.connect()

/* React Root */
ReactDOM.render(
  <Provider store={STORE}>
    <Router
      history={HISTORY}
      routes={routes} />
  </Provider>,
  document.getElementById('app')
)