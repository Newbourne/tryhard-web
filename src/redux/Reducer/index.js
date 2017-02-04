import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'

import { default as Cast } from './Cast'
import { default as LastAction } from './LastAction'
import { default as Party } from './Party'
import { default as Player } from './Player'
import { default as Socket } from './Socket'
import { default as System } from './System'

const logger = store => next => action => {
  console.group(action.type)
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

export default function Store (initialState, routerMiddleware) {
  const reducers = Object.assign({}, {
    routing: routerReducer,
    Cast: Cast,
    Party: Party,
    Player: Player,
    Socket: Socket,
    System: System,
    LastAction: LastAction
  })

  const reducer = combineReducers(reducers)

  let store = applyMiddleware(thunk, logger, routerMiddleware)(createStore)

  var finalStore = store(reducer, initialState)
  return finalStore
}
