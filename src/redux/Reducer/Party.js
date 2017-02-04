import { Party as C } from './../Constants'

const initialState = {
  code: null,
  players: [],
  status: C.DISCONNECTED
}

function addPlayer (players, player) {
  var idx = players.findIndex(x => x.id === player.id)
  if (idx === -1) {
    players.push(player)
  }
  return players
}

function dropPlayer (players, player) {
  var idx = players.findIndex(x => x.id === player.id)
  if (idx !== -1) {
    players.splice(idx, 1)
  }
  return players
}

export default function Reducer (state = initialState, action) {
  switch (action.type) {

    case C.SET_CODE:
      return Object.assign({}, state, {
        code: action.value
      })

    case C.SET_STATUS:
      let players = (action.value !== C.PARTY_CONNECTED) ? [] : state.players
      return Object.assign({}, state, {
        status: action.value,
        players: players
      })

    case C.ADD_PLAYER:
      let playersAdd = addPlayer(state.players.slice(), action.value)
      return Object.assign({}, state, {
        players: playersAdd
      })

    case C.DROP_PLAYER:
      let playersDrop = dropPlayer(state.players.slice(), action.value)
      return Object.assign({}, state, {
        players: playersDrop
      })

    default:
      return state
  }
}
