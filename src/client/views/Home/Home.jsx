import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { Logo } from './../../../components'
import { Join, Host } from './../../forms'

class Home extends Component {
  render () {
    return (
      <div>
        <Logo />
        <Join />
        <Host />
      </div>
    )
  }
}
Home.propTypes = {
  dispatch: PropTypes.func
}
function mapStateToProps (state) {
  return {
  }
}
function mapDispatchToProps (dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch)
  }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
