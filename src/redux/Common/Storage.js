let localStorage = window.localStorage
class Storage {
  get (key) {
    return localStorage.getItem(key)
  }
  set (key, value) {
    return localStorage.setItem(key, value)
  }
}

export default new Storage()
