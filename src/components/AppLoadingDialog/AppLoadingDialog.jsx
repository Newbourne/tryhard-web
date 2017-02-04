import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './AppLoadingDialog.css'

var cx = classNames.bind(styles)

class AppLoadingDialog extends Component {
  render () {
    const { isOpen, text } = this.props
    let cs = cx({ overlay: true, closed: !isOpen })
    let loadingRoot = cx({ loadingRoot: true })
    let loadingLogo = cx({ loadingLogo: true })
    let loadingStatus = cx({ loadingStatus: true })
    return (
      <div className={cs}>
        <div className={loadingRoot}>
          <div className={loadingLogo}>
            [[LOGO]]
          </div>
          <div className={loadingStatus}>
            {text}
          </div>
        </div>
      </div>
    )
  }
}
AppLoadingDialog.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string
}
export default AppLoadingDialog
