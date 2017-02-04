import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './SnackBar.css'

var cx = classNames.bind(styles)

class SnackBar extends Component {
  render () {
    const { isOpen, text } = this.props
    let cs = cx({ overlay: true, closed: !isOpen })
    return (
      <div className={cs}>
        <div>
          <div>
            {text}
          </div>
        </div>
      </div>
    )
  }
}
SnackBar.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string
}
export default SnackBar
