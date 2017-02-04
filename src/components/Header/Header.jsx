import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './Header.css'

var cx = classNames.bind(styles)

class Header extends Component {
  render () {
    let cs = cx({ header: true })
    let value = this.props.value
    return (
      <div className={cs}>
        {value}
      </div>
    )
  }
}
Header.propTypes = {
  value: PropTypes.string
}
export default Header
