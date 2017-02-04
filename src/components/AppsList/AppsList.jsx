import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import AppCard from './AppCard'
import styles from './AppsList.css'

var cx = classNames.bind(styles)

class List extends Component {
  renderApps (apps, select) {
    return apps.map((app, i) => {
      return (
        <AppCard key={i} app={app} select={select.bind(this)} />
      )
    })
  }
  render () {
    const { apps, select } = this.props
    let list = cx({ list: true })
    let listFlex = cx({ listFlex: true })
    let renderApps = ''
    if (apps && apps.length > 0){
      renderApps = this.renderApps(apps, select) 
    }

    return (
      <div className={list}>
        <div className={listFlex}>
          {renderApps}
        </div>
      </div>
    )
  }
}
List.propTypes = {
  apps: PropTypes.array,
  select: PropTypes.func.isRequired
}
export default List