import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'

import styles from './Host.css'
var cx = classNames.bind(styles)

import { FormContainer, Button } from './../../components'
import { Actions, Constants } from './../../redux'

class Host extends Component {
  onContinue () {
    const { castActions } = this.props
    castActions.requestSession()
  }
  render () {
    const { chromeCastStatus } = this
    let disabledState = true
    let chromeCastConnected = false

    var body

    if (chromeCastStatus === Constants.Cast.AVAILABLE ||
      chromeCastStatus === Constants.Cast.INIT_COMPLETE) {
      disabledState = false
    }

    // if (chromeCastStatus === CommanderConstants.CAST_CONNECTED) {
    //     disabledState = true
    //     chromeCastConnected = true
    // }

    let cs = cx({ connected: chromeCastConnected })

    if (chromeCastConnected) {
      body =
        <FormContainer addSpacer>
          <h3 className={cs}>Chromecast Connected!</h3>
        </FormContainer>
    } else {
      body =
        <FormContainer addSpacer>
          <h3>Got a Chromecast?</h3>
          <Button
            value='Host a Party!'
            disabled={disabledState}
            onClick={this.onContinue.bind(this)} />
        </FormContainer>
    }
    return (<div>{body}</div>) // must wrap in divs
  }
}
Host.propTypes = {
  dispatch: PropTypes.func
}
function mapStateToProps (state) {
  return {
    chromeCastStatus: state.Cast.status
  }
}
function mapDispatchToProps (dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    castActions: bindActionCreators(Actions.Cast, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Host)
