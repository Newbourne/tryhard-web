// import React, { PropTypes, Component } from 'react'
// import { bindActionCreators } from 'redux'
// import { routerActions } from 'react-router-redux'
// import { connect } from 'react-redux'
// import classNames from 'classnames/bind'

// import ChromecastIcon from './ChromecastIcon'
// import { Constants as C, Actions as CommanderActions } from './../../Chromecast/index'

// import styles from './icon.css!'
// let cx = classNames.bind(styles)

// class ChromecastController extends Component {
//     constructor(props, context) {
//         super(props, context)
//     }
//     onClick() {
//         const { chromeCastStatus, commanderActions } = this.props
//         if (chromeCastStatus === C.CAST_CONNECTED) {
//             // Open Menu
//         } else {
//             // Request Session
//             commanderActions.castRequestSession()
//         }
//     }
//     render() {
//         const { chromeCastStatus } = this.props
//         let isVisible = true,
//             isActive = false,
//             isOpened = false

//         switch (chromeCastStatus) {
//             case C.CAST_UPDATE:
//             case C.CAST_MESSAGE:
//                 break
//             case C.CAST_REQUEST_SESSION:
//             case C.CAST_INIT_COMPLETE:
//             case C.CAST_AVAILABLE:
//             case C.CAST_DISCONNECTED:
//                 isActive = false
//                 break
//             case C.CAST_NOT_AVAILABLE:
//                 isVisible = false
//                 break
//             case C.CAST_CONNECTED:
//                 isActive = true
//                 break
//             default:
//                 break
//         }

//         let className = cx({
//             icon: true
//         })

//         return (
//             <div className={className} onClick={this.onClick.bind(this)}>
//                 <ChromecastIcon
//                     isVisible={isVisible}
//                     isActive={isActive}
//                     isOpened={isOpened} />
//             </div>
//         )
//     }
// }
// ChromecastController.propTypes = {
//     dispatch: PropTypes.func
// }
// function mapStateToProps(state) {
//     return {
//         chromeCastStatus: state.Commander.chromeCastStatus
//      }
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         commanderActions: bindActionCreators(CommanderActions, dispatch),
//     }
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ChromecastController)
