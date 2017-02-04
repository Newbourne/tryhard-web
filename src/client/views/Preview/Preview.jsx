import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { Logo, AppPreview } from './../../../components'
import { Actions } from './../../../redux'

class Apps extends Component {
  componentWillMount () {
    const { systemActions } = this.props
    // get appId from router
    systemActions.getApp(1)
  }
  start() {
    console.log('start app')
    const { routerActions } = this.props
    routerActions.push('/Board')
  }
  render () {
    const { app } = this.props
    return (
      <div>
        <Logo />
        <AppPreview app={app} start={this.start.bind(this)} />
      </div>
    )
  }
}
Apps.propTypes = {
  dispatch: PropTypes.func
}
function mapStateToProps (state) {
  return {
    app: state.System.app
  }
}
function mapDispatchToProps (dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    systemActions: bindActionCreators(Actions.System, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Apps)
