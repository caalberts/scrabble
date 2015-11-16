import drawScrabbleBoard from './lib/scrabble-board.js'
import letters from './lib/scrabble-letters.js'
import sample from 'lodash.sample'
import dragula from 'dragula'

// create inventory of tiles
var inventory = letters
var player = true
var currentPlayer
// draw Scrabble board
drawScrabbleBoard()
// draw Racks and Score Board then deal tiles

var players = ['player1', 'player2']
players.forEach(player => setRack(player))

if (player) {
  document.body.classList.add('player1')
  currentPlayer = 'player1'
} else {
  document.body.classList.add('player2')
  currentPlayer = 'player2'
}

document.querySelector('.submit').addEventListener('click', submit)

var rack = document.querySelector('.player1-rack')
var board = Array.from(document.querySelectorAll('.board .tile'))
var dragdropArea = [rack].concat(board)
dragula(dragdropArea)

function setRack (player) {
  var rack = document.querySelector('.' + player + '-rack')
  var currentTiles = Array.from(rack.querySelectorAll('.letter-piece'))
  if (currentTiles.length < 7) {
    for (var i = currentTiles.length; i < 7; i++) {
      var piece = document.createElement('div')
      piece.textContent = dealTile().letter.toUpperCase()
      piece.className = 'letter-piece'
      rack.appendChild(piece)
    }
  }
}

function dealTile () {
  var piece = sample(inventory)
  inventory.splice(inventory.indexOf(piece), 1)
  return piece
}

function submit () {
  setRack(currentPlayer)
  player = !player
}
