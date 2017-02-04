import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './Root.css'

import { AppComponent } from './../../../smart-components'

var cx = classNames.bind(styles)

class Root extends Component {
  render () {
    const { props: { children } } = this
    let cs = cx({ root: true })

    return (
      <div className={cs}>
        {children}
        <AppComponent />
      </div>
    )
  }
}
export default Root
