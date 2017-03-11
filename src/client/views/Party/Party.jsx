import React, { PropTypes, Component } from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'

import { Logo, Button, PlayerList } from './../../../components'
import { Actions } from './../../../redux'

import styles from './Party.css'
var cx = classNames.bind(styles)

class Party extends Component {
  componentDidMount () {
    this.props.router.setRouteLeaveHook(this.props.route, (x) => {
      if (x.action === 'POP') {
        const { playerActions, partyActions } = this.props
        // disconnect from lobby
        partyActions.leave()
        partyActions.setCode(null)
        playerActions.setUsername(null)
        return true
      }
      return true
    })
  }
  onClick () {
    const { routerActions } = this.props
    routerActions.push('/apps')
  }
  render () {
    let header = cx({ partyHeader: true })
    const { partyCode, isHost, players } = this.props

    return (
      <div>
        <Logo />
        <div className={header}>
          <h3>Party</h3>
          <h1>{partyCode}</h1>
          {!isHost ? <p>Waiting on host...</p> : ''}
        </div>
        <PlayerList players={players} />
        <div>
          {isHost
          ? <Button
            hidden={false}
            disabled={false}
            value='Games'
            onClick={this.onClick.bind(this)} /> : ''}
        </div>
      </div>
    )
  }
}

Party.propTypes = {
  dispatch: PropTypes.func
}
function mapStateToProps (state) {
  return {
    username: state.Player.username,
    isHost: state.Player.isHost,
    partyCode: state.Party.code,
    players: state.Party.players,
    partyStatus: state.Party.status
  }
}
function mapDispatchToProps (dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    playerActions: bindActionCreators(Actions.Player, dispatch),
    partyActions: bindActionCreators(Actions.Party, dispatch)
  }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
 )(Party))
