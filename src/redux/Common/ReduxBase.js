class ReduxBase {
  constructor (store) {
    this.store = store
  }
  dispatch (msg) {
    return this.store.dispatch(msg)
  }
  reduxListener () {
        // Used to listen for and process messages
  }
  start () {
        // initial start function
  }
}

export default ReduxBase
