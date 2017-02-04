import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { Logo, AppsList } from './../../../components'
import { Actions } from './../../../redux'

class Apps extends Component {
  componentWillMount () {
    const { systemActions } = this.props
    systemActions.getApps()
  }
  select(appId) {
    // add appId to the route.
    const { routerActions } = this.props
    routerActions.push('/preview')
  }
  render () {
    const { apps } = this.props
    return (
      <div>
        <Logo />
        <AppsList apps={apps} select={this.select.bind(this)} />
      </div>
    )
  }
}
Apps.propTypes = {
  dispatch: PropTypes.func
}
function mapStateToProps (state) {
  return {
    apps: state.System.apps
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
