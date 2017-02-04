import React, { PropTypes, Component } from 'react'
import classNames from 'classnames/bind'

import Button from './../Button/Button'
import styles from './AppPreview.css'

var cx = classNames.bind(styles)

class Preview extends Component {
  drawRequirements() {
    const { requirements } = this.props.app
    if (!requirements){
      return ''
    }
    return requirements.map((req, i) => {
      return (
        <li key={i}>{req}</li>
      )
    })
  }

  drawPreview() {
    const { hasPreview } = this.props.app
    if (!hasPreview) {
      return ''
    } else {
      return (
        <h2>Preview</h2>
      )
    }
  }

  render () {
    const { app, start } = this.props
    let card = cx({ card: true })

    if (!app) {
      console.log('render Preview', app)
      return (<div/>)
    }

    var requirements = this.drawRequirements()
    var preview = this.drawPreview()

    return (
      <div className={card}>
        <div>
          <h1>{app.name}</h1>
        </div>
        <div>
          {app.description}
        </div>     
        <div>
          <ul>
            {requirements}
          </ul>
        </div>
        <div>
          {preview}
        </div>
        <div>
          <Button value="Play" onClick={start.bind(this)}/>
        </div>        
      </div>
    )
  }
}
Preview.propTypes = {
  // app: PropTypes.shape({
  //   id: PropTypes.string,
  //   name: PropTypes.string,
  //   description: PropTypes.string,
  //   requirements: PropTypes.array,
  //   hasPreview: PropTypes.bool
  // }),
  app: PropTypes.object,
  start: PropTypes.func.isRequired
}
export default Preview