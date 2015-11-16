import drawScrabbleBoard from './lib/scrabble-board.js'
import letters from './lib/scrabble-letters.js'
import sample from 'lodash.sample'
import dragula from 'dragula'

// create inventory of tiles
var inventory = letters
var player = false
var currentPlayer
var draft = []
var drake = dragula({
  accepts: function (el, target, source, sibling) {
    return target.children.length === 0
  }}).on('drop', (el) => {
    draft.push(el)
    el.classList.toggle('draft')
  })
// draw Scrabble board
drawScrabbleBoard()
// draw Racks and Score Board then deal tiles
var players = ['player1', 'player2']
players.forEach(player => setRack(player))

// create event listeners on buttons
document.querySelector('.reset').addEventListener('click', reset)
document.querySelector('.submit').addEventListener('click', submit)
document.querySelector('.pass').addEventListener('click', pass)

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
}

function submit () {
  // validate submission
  // if submission is valid, calculate score, submit score, refill rack, change player
  draft = []
  reset()
  setRack(currentPlayer)
  changePlayer()
}

function pass () {
  reset()
  changePlayer()
}

function changePlayer () {
  drake.containers.destroy
  player = !player
  currentPlayer = player ? 'player1' : 'player2'
  document.body.className = currentPlayer
  drake.containers = [document.querySelector('.' + currentPlayer + '-rack')]
    .concat(Array.from(document.querySelectorAll('.board .tile')))
}
