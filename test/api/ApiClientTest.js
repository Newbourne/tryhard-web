import tape from 'tape'
import _test from 'tape-promise'
import sinon from 'sinon'
import { ApiClient } from './../../src/api'

const test = _test(tape)

function stubWindow (result, shouldReject) {
  if (shouldReject) {
    var fetch = () => new Promise((resolve, reject) => reject(result))
    global.window = { fetch: fetch }
    return
  }
  var fetch = () => new Promise((resolve, reject) => resolve(result))
  global.window = { fetch: fetch }
}

test('api client tests', (t) => {
  t.test('--should get apps, expects array', async (t) => {
        // window is not avaiable in node.
        // stub window object to global context.
    var result = {
      json () {
        return []
      }
    }
    stubWindow(result)

    var client = new ApiClient('')
    let apps = await client.getApps()

    t.ok(apps instanceof Array, 'should be array')
    t.end()
  })

  t.test('--should validate result', async (t) => {
        // window is not avaiable in node.
        // stub window object to global context.
    var result = {
      json () {
        return ''// invalid type
      }
    }
    stubWindow(result)

    var client = new ApiClient('')
    let apps = await client.getApps()

    t.notOk(apps instanceof Array, 'should be array')
    t.end()
  })

  t.test('--should validate fetch promise failure', async (t) => {
    try {
      var result = new TypeError('')
      stubWindow(result, true)

      var client = new ApiClient('')
      await client.getApps()

      t.fail('should throw exception')
    } catch (err) {
      t.ok(err instanceof TypeError)
      t.end()
    }
  })
})
