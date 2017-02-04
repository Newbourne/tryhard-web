import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { AppPreview } from './../../../components'
import { Actions } from './../../../redux'

class Board extends Component {
  componentWillMount () {
    // Load app
    SystemJS.import('http://localhost:3010/app.bundle.js')
  }
  render () {
    const { app } = this.props
    return (
      <div id='client'>
       {/* The client application should be loaded here */}
      </div>
    )
  }
}
Board.propTypes = {
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
)(Board)
