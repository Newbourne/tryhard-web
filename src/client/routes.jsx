import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Root, Apps, Preview, Board, Error, NotFound, Home, Party } from './views/index'

export default (
  <Route path='/' component={Root}>
      <IndexRoute component={Home} />

      {/* Party */}
      <Route path='party' component={Party} />

      {/* Apps */}
      <Route path='apps' component={Apps} />

      {/* Preview */}
      <Route path='preview' component={Preview} />  

      {/* Board */}
      <Route path='board' component={Board} />       

      {/* Catch All, Not-Found, Error */}
      <Route path='error' component={Error} />
      <Route path='not-found' component={NotFound} />
      <Route path='*' component={NotFound} />
  </Route>
)