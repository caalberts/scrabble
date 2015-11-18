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
      piece.setAttribute('score', draw.score)
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
  if (draft.length > 0) {
    // validate submission
    const word
    // determine direction if it's row or column
    const direction = validate.findDirection(draft)
    // rearrange 'draft' based on tile position --> turn into 'word'
    if (direction) {
      word = validate.rearrange(draft)
      // check for whole word or has gaps
      gaps = findGaps(word, direction)
      if (gaps === false) {
        // if whole word --> calculate word score

      } else {
        // if not whole word
        // fill gap with existing letters
        gaps = fillWithExistingLetters(word, direction)
        // include existing letters into word --> calculate word score

      }
    }





          // '.set' class will indicate no bonus should be applied
      // if cannot be filled, reject submission

    // find other extended words ### TO-DO


    if (validate(draft)) {
      // calculate score
      // submit score

      // set tiles in the board so they can't be moved anymore
      draft.forEach(piece => {
        piece.classList.add('set')
      })
      draft = []
      // refill rack and change player
      setRack(currentPlayer)
      changePlayer()
    } else {
      // reject invalid submission
      // console.log('Please enter a valid move:')
      // console.log('1. Start on the center tile')
      // console.log('2. All letters must be connected')
      // console.log('3. Word must be in English')
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
