import drawScrabbleBoard from './lib/scrabble-board.js'
import letters from './lib/scrabble-letters.js'
import * as validate from './lib/validate-words.js'
import sample from 'lodash.sample'
import includes from 'lodash.includes'
import dragula from 'dragula'

// create inventory of tiles
var inventory = letters
var player = false
var currentPlayer
var draft = []
var drake = dragula({
  moves: function (el) {
    return !includes(Array.from(el.classList), 'set')
  },
  accepts: function (el, target, source, sibling) {
    return target.children.length === 0 || includes(Array.from(target.classList), 'rack')
  }}).on('drop', (el) => {
    // remove letter from existing draft if it's repositioned
    if (includes(draft, el)) {
      draft.splice(draft.indexOf(el), 1)
    }
    // add letter into draft
    draft.push(el)
    el.classList.add('draft')
  })
// draw Scrabble board
drawScrabbleBoard()
// draw Racks and Score Board then deal tiles
var players = ['player1', 'player2']
players.forEach(player => setRack(player))

// create event listeners on buttons
document.querySelector('.reset').addEventListener('click', reset)
document.querySelector('.submit').addEventListener('click', submit)
document.querySelector('.pass').addEventListener('click', changePlayer)

changePlayer()

function setRack (player) {
  var rack = document.querySelector('.' + player + '-rack')
  var currentTiles = Array.from(rack.querySelectorAll('.letter-piece'))
  if (currentTiles.length < 7) {
    for (var i = currentTiles.length; i < 7; i++) {
      var piece = document.createElement('div')
      var draw = dealTile()
      piece.textContent = draw.letter.toUpperCase()
      piece.className = 'letter-piece score-' + draw.score
      rack.appendChild(piece)
    }
  }
}

function dealTile () {
  if (inventory.length > 0) {
    var piece = sample(inventory)
    inventory.splice(inventory.indexOf(piece), 1)
    return piece
  }
}

function reset () {
  draft.forEach(piece => {
    document.body.querySelector('.' + currentPlayer + '-rack').appendChild(piece)
  })
  Array.from(document.body.querySelectorAll('.draft')).forEach(piece => piece.classList.remove('draft'))
  draft = []
}

function submit () {
  // validate submission
  if (draft.length > 0) {
    if (validate.isConnected(draft)) {
      console.log('All tiles are connected')
      // if submission is valid, calculate score, submit score, refill rack, change player

      // set tiles in the board so they can't be moved anymore
      draft.forEach(piece => {
        piece.classList.add('set')
      })
      draft = []
      setRack(currentPlayer)
      changePlayer()
    } else {
      // reject invalid submission
      console.log('All tiles must be connected and form a word')
    }
  } else {
    // reject empty submission
    console.log('You need to submit a word')
    console.log('If you can\'t think of a word, pass')
  }
}

function changePlayer () {
  reset()
  // disable drag and drop for current player
  drake.containers.destroy
  // change player
  player = !player
  currentPlayer = player ? 'player1' : 'player2'
  document.body.className = currentPlayer
  // enable drag and drop for next player
  drake.containers = [document.querySelector('.' + currentPlayer + '-rack')]
    .concat(Array.from(document.querySelectorAll('.board .tile')))
}
