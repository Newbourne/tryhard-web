import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './FormContainer.css'
var cx = classNames.bind(styles)

class FormContainer extends Component {
  render () {
    const { props: { children, addSpacer } } = this
    let cs = cx({ container: true, spacer: addSpacer })

    return (
      <div className={cs}>
        {children}
      </div>
    )
  }
}
FormContainer.propTypes = {
  children: PropTypes.node,
  addSpacer: PropTypes.bool
}
export default FormContainer
