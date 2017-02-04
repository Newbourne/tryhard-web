import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, Party, Error, NotFound } from './views/index'

export default (
  <Route component={App}>
    <Route path='/'>
      <IndexRoute component={Party} />

      {/* Catch All, Not-Found, Error */}
      <Route path='error' component={Error} />
      <Route path='not-found' component={NotFound} />
      <Route path='*' component={NotFound} />
    </Route>
  </Route>
)
