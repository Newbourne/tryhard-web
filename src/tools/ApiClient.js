export default class ApiClient {
  getLobbyCode (code) {
    if (!code) {
      code = ''
    } else {
      code = `/${code}`
    }
    return window.fetch(`http://localhost:8181/api/lobby/gen${code}`)
      .then(res => res.json())
  }

  getApps () {
    return window.fetch(`http://localhost:8181/api/apps`)
      .then(res => res.json())
  }

  getApp (id) {
    return window.fetch(`http://localhost:8181/api/app/${id}`)
      .then(res => res.json())
  }
}
