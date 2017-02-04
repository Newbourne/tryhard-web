import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './icon.css'
let cx = classNames.bind(styles)

class ChromecastIcon extends Component {
  render () {
    const { isVisible, isActive, isOpened } = this.props

    let base = cx({
      base: true,
      baseHidden: !isVisible
    })

    let ccBody = cx({
      ccBody: true,
      ccActive: isActive,
      ccMenu: isOpened
    })

    let ccFrame = cx({
      ccFrame: true
    })

    return (
      <svg className={base}
          // width="293.671"
          // height="224.571"
        viewBox='0 0 293.671 224.571'
        preserveAspectRatio='xMidYMid meet'
        xmlns='http://www.w3.org/2000/svg'>
        <g>
          <g className={ccFrame}>
            <path id='cast_frame' fill-rule='evenodd' clip-rule='evenodd' d='m17.275,0l0,95.016c7.94,1.614 15.627,3.909 23.033,6.768l0,-78.752l230.33,0l0,161.231l-147.853,0c2.861,7.407 5.155,15.092 6.771,23.032l164.115,0l0,-207.295l-276.396,0z' />
            <path id='small-sig' d='m0,191.527l0,33.044l33.037,0c-4.167,-16.173 -16.87,-28.87 -33.037,-33.044z' />
            <path id='mid-sig' d='m0,150.569l0,23.274c25.738,4.734 45.993,24.989 50.728,50.728l23.275,0c-5.139,-38.463 -35.534,-68.862 -74.003,-74.002z' />
            <path id='large-sig' d='m0,109.952l0,23.162c48.034,5.32 86.144,43.423 91.458,91.458l23.162,0c-5.477,-60.766 -53.849,-109.137 -114.62,-114.62z' />
          </g>
          <path className={ccBody} d='m46.83315,103.88095l0.05034,-74.34178l217.07607,-0.01044l-0.00301,148.25577c-139.65353,0.21913 -142.98028,0.21913 -142.98028,0.21913c0,0 -16.40436,-54.62376 -74.14312,-74.12268z' />
        </g>
      </svg>
    )
  }
}
ChromecastIcon.propTypes = {
  isVisible: PropTypes.bool,
  isActive: PropTypes.bool,
  isOpened: PropTypes.bool
}
ChromecastIcon.defaultProps = {
  isVisible: false,
  isActive: false,
  isOpened: false
}
export default ChromecastIcon
