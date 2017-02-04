import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers/index'

const logger = store => next => action => {
  console.group(action.type)
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

export default function create (initialState, routerMiddleware, serviceReducers) {
  const reducer = combineReducers(Object.assign({},
        reducers,
        serviceReducers))

  let store = applyMiddleware(thunk, logger, routerMiddleware)(createStore)

  var finalStore = store(reducer, initialState)
  return finalStore
}
