import drawScrabbleBoard from './lib/scrabble-board.js'
import drawRacks from './lib/player-racks.js'
import letters from './lib/scrabble-letters.js'
import sample from 'lodash.sample'
import without from 'lodash.without'

// create inventory of tiles
var inventory = letters

// draw Scrabble board
drawScrabbleBoard()
// draw Racks and Score Board then deal tiles

var players = ['player1', 'player2']
players.forEach(player => {
  drawRacks(player)
  Array.from(document.querySelector('.' + player + '-rack').querySelectorAll('.empty-slot'))
    .forEach(emptySlot => {
      emptySlot.textContent = dealTile(emptySlot).letter.toUpperCase()
    })
})

function dealTile (slot) {
  var tile = sample(inventory)
  inventory.splice(inventory.indexOf(tile), 1)
  return tile
}
