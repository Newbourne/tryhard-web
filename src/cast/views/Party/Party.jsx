import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'

import { PlayerList } from './../../../components'

import styles from './Party.css'
var cx = classNames.bind(styles)

class Party extends Component {
  render () {
    const { code, players } = this.props
    let partyRoot = cx({ partyRoot: true })
    let partyCodeText = cx({ partyCode: true })

    return (
      <div className={partyRoot}>
        <div>dimples.media</div>
        <div className={partyCodeText}>
            {code}
        </div>
        <p>Waiting for players...</p>
        <PlayerList players={players} />
      </div>
    )
  }
}
Party.propTypes = {
  dispatch: PropTypes.func
}
function mapStateToProps (state) {
  return {
    code: state.Party.code,
    players: state.Party.players
  }
}
function mapDispatchToProps (dispatch) {
  return {
  }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Party)
