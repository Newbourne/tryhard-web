import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './TextBox.css'

var cx = classNames.bind(styles)

class TextBox extends Component {
  render () {
    let value = this.props.value
    let placeholder = this.props.placeholder
    let onChange = this.props.onChange
    let cs = cx({ textBox: true })

    return (
      <input
        type='text'
        className={cs}
        value={value}
        placeholder={placeholder}
        onChange={onChange} />
    )
  }
}

TextBox.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default TextBox
