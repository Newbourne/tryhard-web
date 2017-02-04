import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { FormContainer, Button, TextBox } from './../../components'
import { Actions, Constants } from './../../redux'

class Join extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      partyCode: '',
      username: ''
    }
  }
  onContinue () {
    const { playerActions, partyActions, isHost, isPresenter } = this.props
    playerActions.setUsername(this.state.username)
    partyActions.setCode(this.state.partyCode)
    partyActions.join(this.state.partyCode, this.state.username, isHost, isPresenter)
  }
  componentWillReceiveProps (props) {
    const { routerActions, partyStatus } = props
    if (partyStatus === Constants.Party.CONNECTED) {
      routerActions.push('/party')
    }
    if (partyStatus === Constants.Party.NOT_AVAILABLE) {
        // notifiy user the party is not available
    }
  }
  onPartyCodeChange (event) {
    this.setState({
      partyCode: event.target.value.toUpperCase()
    })
  }
  onUsernameChange (event) {
    this.setState({
      username: event.target.value.toUpperCase()
    })
  }
  isFormComplete () {
    const { partyCode, username } = this.state
    return partyCode &&
            partyCode.length > 0 &&
            username && username.length > 0
  }
  render () {
    const { partyCode, username } = this.state
    let continueEnabled = this.isFormComplete()
    return (
      <FormContainer>
        <h3>Join your friends!</h3>
        <TextBox placeholder='Party Code' value={partyCode} onChange={this.onPartyCodeChange.bind(this)} />
        <TextBox placeholder='Username' value={username} onChange={this.onUsernameChange.bind(this)} />
        <Button value='Join Party' disabled={!continueEnabled} onClick={this.onContinue.bind(this)} />
      </FormContainer>
    )
  }
}
Join.propTypes = {
  dispatch: PropTypes.func
}
function mapStateToProps (state) {
  return {
    isHost: state.Player.isHost,
    isPresenter: state.Player.isPresenter,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join)
