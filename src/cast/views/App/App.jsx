import React, { Component } from 'react'
import classNames from 'classnames/bind'

import { AppComponent } from './../../../smart-components'

import styles from './App.css'
var cx = classNames.bind(styles)

class App extends Component {
  render () {
    const { props: { children } } = this
    let cs = cx({ appRoot: true })

    return (
      <div className={cs}>
        {children}
        <AppComponent />
      </div>
    )
  }
}

export default App
