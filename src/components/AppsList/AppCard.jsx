import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import styles from './AppCard.css'

var cx = classNames.bind(styles)

class AppCard extends Component {
  onClick () {
    const { app, select } = this.props
    select(app.id)
  }
  render () {
    const { app } = this.props
    let cs = cx({ appBox: true })

    let content = (!!app.icon) ? app.name : app.icon

    return (
      <div className={cs} onClick={this.onClick.bind(this)}>
        { (app.icon) ?
          <img src={app.icon} />
          : <h2>{app.name}</h2>
        }
      </div>
    )
  }
}
AppCard.propTypes = {
  app: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string,
    name: PropTypes.string
  }),
  select: PropTypes.func
}
export default AppCard