import React, { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './Logo.css'

var cx = classNames.bind(styles)

class Logo extends Component {
  render () {
    let cs = cx({ logoContainer: true })
    return (
      <div className={cs}>
        <h1>Logo</h1>
      </div>
    )
  }
}
export default Logo
