import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './Button.css'

class Button extends Component {
  render () {
    const { value, disabled, hidden, onClick } = this.props
    let cx, cs
    cx = classNames.bind(styles)
    cs = cx({ button: true, hidden: hidden })
    return (
      <input className={cs}
        type='button'
        value={value}
        onClick={onClick}
        disabled={disabled} />
    )
  }
}
Button.propTypes = {
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
}
export default Button
