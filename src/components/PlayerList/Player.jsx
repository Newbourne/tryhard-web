import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './Player.css'

var cx = classNames.bind(styles)

class Player extends Component {
  render () {
    const { info } = this.props
    let playerBox = cx({ playerBox: true })
    let icon = cx({ icon: true })
    let username = cx({ username: true })

    return (
      <div key={info.id} className={playerBox}>
        <div className={icon}>
          [icon]
        </div>
        <div className={username}>
          {info.username}
        </div>
      </div>
    )
  }
}
Player.propTypes = {
  info: PropTypes.object
}
export default Player
