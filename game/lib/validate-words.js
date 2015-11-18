import difference from 'lodash.difference'
import includes from 'lodash.includes'
import isEmpty from 'lodash.isempty'
import first from 'lodash.first'
import last from 'lodash.last'
import range from 'lodash.range'
import sortBy from 'lodash.sortby'
import * as score from './score.js'

export function validate (draft) {
  var direction
  var word
  // determine if the word is a single-letter word, in a row or in a column
  // sort out the order of letters from draft into word
  if (draft.length === 1) {
    direction = 'single'
    word = draft
  } else if (draft.map(letter => letter.parentElement.getAttribute('row'))
        .reduce((a, b) => { return (a === b) ? a : false })) {
    direction = 'row'
    word = sortBy(draft, letter => letter.parentElement.getAttribute('col'))
  } else if (draft.map(letter => letter.parentElement.getAttribute('col'))
        .reduce((a, b) => { return (a === b) ? a : false })) {
    direction = 'col'
    word = sortBy(draft, letter => letter.parentElement.getAttribute('row').charCodeAt())
  } else {
    // letters are not arranged in the same row or column
    return false
  }

  if (findGaps(word, direction) === false) {
    // connected to neighbour or valid first move
    console.log(score.calculateWordScore(word))
    return isConnectedToExistingLetters(word, direction) || isValidFirstMove(word)
  } else {
    // contains exiting letter
    return containsExistingLetter(word, direction)
  }
}

export function findDirection (draft) {
  if (draft.length === 1) {
    direction = 'single'
  } else if (draft.map(letter => letter.parentElement.getAttribute('row'))
        .reduce((a, b) => { return (a === b) ? a : false })) {
    direction = 'row'
  } else if (draft.map(letter => letter.parentElement.getAttribute('col'))
        .reduce((a, b) => { return (a === b) ? a : false })) {
    direction = 'col'
  } else {
    // letters are not arranged in the same row or column --> REJECT
    return false
  }
}

export function rearrange (draft, direction) {
  switch (direction) {
    case 'row':
      return sortBy(draft, letter => letter.parentElement.getAttribute('col'))
    case 'col':
      return sortBy(draft, letter => letter.parentElement.getAttribute('row').charCodeAt())
    default: // single tile doesn't need to be rearranged
      return
  }
}

export function findGaps (word, direction) {
  switch (direction) {
    // single-letter doesn't have gaps
    case 'single':
      return false
    case 'row':
      return checkGaps(word.map(letter => parseInt(letter.parentElement.getAttribute('col'), 10)))
    case 'col':
      return checkGaps(word.map(letter => letter.parentElement.getAttribute('row').charCodeAt()))
  }
}

function checkGaps (list, fix, type) {
  var test = range(first(list), last(list) + 1)
  var gaps = difference(test, list)
  if (isEmpty(gaps)) {
    return false
  } else {
    gaps.every(gap => {
      switch (type) {
        case 'row':
          return checkForExistingLetter(String.fromCharCode(gap), fix)
        case 'col':
          return checkForExistingLetter(fix, gap)
        default:
          return []
      }
    })
  }
}

// gaps.every(gap => {
//   switch (type) {
//     case 'row':
//       return checkForExistingLetter(String.fromCharCode(gap), fix)
//     case 'col':
//       return checkForExistingLetter(fix, gap)
//   }
// })

function isValidFirstMove (word) {
  // check if word is on starting tile
  if (word.map(letter => letter.parentElement).some(parent => includes(Array.from(parent.classList), 'start-tile'))) {
    return true
  } else {
    return false
  }
}

function fillWithExistingLetters (word, direction) {
  switch (direction) {
    case 'row':
      return checkGaps(word.map(letter => parseInt(letter.parentElement.getAttribute('col'), 10)),
                       first(word).parentElement.getAttribute('row'),
                       'col')
    case 'col':
      return checkGaps(word.map(letter => letter.parentElement.getAttribute('row').charCodeAt()),
                       parseInt(first(word).parentElement.getAttribute('col'), 10),
                       'row')
  }
}

function isConnectedToExistingLetters (word, direction) {
  var parents = word.map(letter => letter.parentElement)
  // some parent must be adjacent to existing letter
  switch (direction) {
    case 'single':
      return (
        checkNeighbour(first(parents), 'up') ||
        checkNeighbour(first(parents), 'down') ||
        checkNeighbour(first(parents), 'left') ||
        checkNeighbour(first(parents), 'right')
      )
    case 'row':
      return (
        parents.some(parent => {
          return checkNeighbour(parent, 'up') || checkNeighbour(parent, 'down')
        }) || checkNeighbour(first(parents), 'left') || checkNeighbour(last(parents), 'right')
      )
    case 'col':
      return (
        parents.some(parent => {
          return checkNeighbour(parent, 'left') || checkNeighbour(parent, 'right')
        }) || checkNeighbour(first(parents), 'up') || checkNeighbour(last(parents), 'down')
      )
  }
}

function checkNeighbour (el, direction) {
  var row = el.getAttribute('row').charCodeAt()
  var col = parseInt(el.getAttribute('col'), 10)
  var targetRow
  var targetCol
  switch (direction) {
    case 'up':
      targetRow = String.fromCharCode(row - 1)
      targetCol = col
      break
    case 'down':
      targetRow = String.fromCharCode(row + 1)
      targetCol = col
      break
    case 'left':
      targetRow = String.fromCharCode(row)
      targetCol = col - 1
      break
    case 'right':
      targetRow = String.fromCharCode(row)
      targetCol = col + 1
      break
  }
  return checkForExistingLetter(targetRow, targetCol)
}

// check if target element contains an existing letter
function checkForExistingLetter (targetRow, targetCol) {
  return document.body.querySelector('#' + targetRow + targetCol).querySelector('.set')
}
