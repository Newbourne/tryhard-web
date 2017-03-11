import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { AppLoadingDialog } from './../components'

class AppComponent extends Component {
  render () {
    const { isLoadingOpen, isLoadingText } = this.props
    return (
      <AppLoadingDialog isOpen={isLoadingOpen} text={isLoadingText} />
    )
  }
}
AppComponent.propTypes = {
  dispatch: PropTypes.func
}
function mapStateToProps (state) {
  return {
    isLoadingOpen: state.System.isLoading,
    isLoadingText: state.System.loadingText
  }
}
function mapDispatchToProps (dispatch) {
  return { }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent)
