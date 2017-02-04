import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import Player from './Player'
import styles from './PlayerList.css'

var cx = classNames.bind(styles)

class List extends Component {
  renderPlayers (players) {
    if (players) {
      return players.map((player, i) => {
        return (
          <Player key={i} info={player} />
        )
      })
    }
  }
  render () {
    const { players } = this.props

    let playerContainer = cx({ playerContainer: true })
    let playerFlex = cx({ playerFlex: true })
    var renderPlayers = this.renderPlayers(players)

    return (
      <div className={playerContainer}>
        <div className={playerFlex}>
          {renderPlayers}
        </div>
      </div>
    )
  }
}
List.propTypes = {
  players: PropTypes.array
}
export default List
