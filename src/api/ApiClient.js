export default class ApiClient {
  constructor (baseAddr) {
    this.baseAddr = baseAddr
  }

  getLobbyCode(code) {
    if (!code) {
      code = ''
    } else {
      code = `/${code}`
    }
    return window.fetch(`http://${this.baseAddr}/lobby/gen${code}`)
      .then(res => res.json())
  }

  getApps() {
    return window.fetch(`http://${this.baseAddr}/apps`)
      .then(res => res.json())
  }

  getApp(id) {
    return window.fetch(`http://${this.baseAddr}/app/${id}`)
      .then(res => res.json())
  }
}
