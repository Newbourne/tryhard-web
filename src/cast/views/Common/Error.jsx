import React, { Component } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

class Error extends Component {
  componentWillMount () {
    const { error, dispatch } = this.props
    if (!error || error.lengh > 0) {
      dispatch(routeActions.push('/'))
    }
  }
  render () {
    const { error } = this.props
    return (
      <div>
        <h2>Ah man, I'm so sorry!</h2>
        <p>An unexpected error has occurred. Hopefully, this has been
        reported and I will be able to fix in a timely fashion. </p>
        <p>
            {error}
        </p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    error: state.ErrorReducer.error
  }
}

export default connect(
  mapStateToProps,
  null
)(Error)
