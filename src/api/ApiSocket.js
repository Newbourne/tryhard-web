import * as uuid from 'node-uuid'

/*
	ApiClient
	- auto-reconnect
	- heartbeats
	- TODO
	- party integration
	- ?
*/

var HEARTBEAT = 'HEARTBEAT'
var CLIENT_COOKIE_ID = 'CLIENT_ID'

export default class ApiSocket {
  constructor (baseAddr) {
      this.baseAddr = baseAddr
      this.websocket = null
      this.isConnected = false

      // events
      this.onopen = null
      this.onmessage = null
      this.onerror = null
      this.onclose = null      
  }
  // non-Exponential Backoff
  // every 2 seconds for now
  // Auto-reconnect
  connect () {
    if (this.getCookie(CLIENT_COOKIE_ID) === '') {
      var expireTime = new Date(Date.now())
      expireTime.setHours(expireTime.getHours() + 24)
      var cookie = CLIENT_COOKIE_ID + '=' + uuid.v4() + '; expires=' + expireTime.toISOString()
      document.cookie = cookie
    }

    setInterval((ctx) => {
      ctx.autoReconnect()
    }, 2000, this)
  }
  autoReconnect () {
    if (!this.isConnected) {
      this.isConnected = true
      if (!!this.websocket) {
        this.websocket.close()
      }
      try {
        this.websocket = new window.WebSocket(`ws://${this.baseAddr}/connect`)

        this.websocket.onopen = (event) => {
          if (!!this.onopen) {
            this.onopen(event)
          }
        }

        this.websocket.onmessage = (event) => {
          this.processMessage(event)
        }

        this.websocket.onerror = (event) => {
          this.isConnected = false
          if (!!this.onerror) {
            this.onerror(event)
          }
        }

        this.websocket.onclose = (event) => {
          this.isConnected = false
          if (!!this.onclose) {
            this.onclose(event)
          }
        }
      } catch (e) {
        if (!!this.onerror) {
          this.onerror(e)
        }
      }
    }
  }
  getCookie (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
  processMessage (event) {
    if (!!event && !!event.data) {
      var msg = JSON.parse(event.data)
      if (!!msg.command && msg.command === HEARTBEAT) {
        this.send(JSON.stringify({ command: HEARTBEAT }))
      } else {
        if (!!this.onmessage) {
          this.onmessage(msg)
        }
      }
    }
  }
  send (msg) {
    this.websocket.send(msg)
  }
  close () {
    this.websocket.close()
  }
}
