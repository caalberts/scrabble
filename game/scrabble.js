import drawScrabbleBoard from './lib/scrabble-board.js'
import letters from './lib/scrabble-letters.js'
import * as validate from './lib/validate-words.js'
import * as score from './lib/score.js'
import * as search from './lib/search-words.js'
import * as dictionary from './lib/dictionary.js'
import library from './lib/library.js'
import sample from 'lodash.sample'
import includes from 'lodash.includes'
import dragula from 'dragula'

var inventory = letters
var player = false
var currentPlayer
var playerScores = [0, 0]
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
document.querySelector('.next').addEventListener('click', dismissScore)
document.querySelector('.close').addEventListener('click', dismissError)

function dismissScore () {
  document.querySelector('.overlay-score').classList.toggle('hidden')
  document.querySelector('.overlay').classList.toggle('hidden')
  // set tiles in the board so they can't be moved anymore
  draft.forEach(piece => {
    piece.classList.add('set')
  })
  draft = []
  // refill rack and change player
  setRack(currentPlayer)
  changePlayer()
  // for (var el of document.querySelectorAll('.score-item'))
  //   el.remove()
  Array.from(document.querySelectorAll('.score-item')).forEach(el => el.remove())
  document.querySelector('.total-score').remove()
}

function dismissError () {
  document.querySelector('.overlay-error').classList.toggle('hidden')
  document.querySelector('.overlay').classList.toggle('hidden')
  reset()
}

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
  Array.from(document.body.querySelectorAll('.draft')).forEach(el => el.classList.remove('draft'))
  // for (var el of document.body.querySelectorAll('.draft'))
  //   el.classList.remove('draft')
  draft = []
}

function submit () {
  var errors = []
  if (draft.length > 0) {
    // validate submission
    // determine if letters are placed in a row or column
    var line = validate.findDirection(draft)
    // rearrange 'draft' based on tile position --> save into 'word'
    if (line) {
      var word = validate.rearrange(draft, line)

      // check if word is adjacent to existing tiles or a valid first move
      if (validate.isValidFirstMove(word) || validate.isConnectedToExistingLetters(word)) {
        word = validate.findGaps(word, line)
        if (word) {
          // word is valid

          var submissions = []
          // find word along the line of the draft
          submissions.push(search.findWords(draft[0], line))

          // find words across the line of the draft
          draft.forEach(letter => {
            // may need to check for dupes
            if (isNaN(line)) {
              submissions.push(search.findWords(letter, letter.parentElement.getAttribute('col')))
            } else {
              submissions.push(search.findWords(letter, letter.parentElement.getAttribute('row')))
            }
          })

          // remove single letter words
          submissions = submissions.filter(submission => submission.length > 1)

          // check words against dictionary
          if (dictionary.checkDictionary(library, submissions)) {
            // calculate scores
            var results = submissions.map(submission => {
              var temp = {
                'word': submission.map(letter => letter.textContent).join(''),
                'score': score.calculateWordScore(submission)
              }

              return temp
            })
            var totalScore = results.reduce((total, next) => { return total + next.score }, 0)

            // prepare scores for overlay
            var scoreContainer = document.querySelector('.score-container')

            results.forEach(result => {
              var scoreItem = document.createElement('div')
              scoreItem.classList.add('score-item')
              scoreItem.textContent = result.word + ': ' + result.score
              scoreContainer.appendChild(scoreItem)
            })
            var totalScoreContainer = document.createElement('div')
            totalScoreContainer.classList.add('total-score')
            totalScoreContainer.textContent = 'Total Score = ' + totalScore
            scoreContainer.appendChild(totalScoreContainer)

            // update and display scores
            if (player) {
              playerScores[0] += totalScore
              document.querySelector('.player1-score').textContent = playerScores[0]
            } else {
              playerScores[1] += totalScore
              document.querySelector('.player2-score').textContent = playerScores[1]
            }
            document.querySelector('.overlay').classList.toggle('hidden')
            document.querySelector('.overlay-score').classList.toggle('hidden')
          } else {
            errors.push('Words are not in the dictionary')
          }
        } else {
          // reject incomplete word
          errors.push('Incomplete word')
        }
      } else {
        // reject invalid locations
        errors.push('Word must be on starting tile or connected to existing words')
      }
    } else {
      // reject invalid submission
      errors.push('other errors')
    }
  } else {
    // reject empty submission
    errors.push('You need to submit a word or pass')
  }
  if (errors.length > 0) {
    document.body.querySelector('.error-message').textContent = errors
    document.body.querySelector('.overlay').classList.toggle('hidden')
    document.body.querySelector('.overlay-error').classList.toggle('hidden')
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
