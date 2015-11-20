import includes from 'lodash.includes'
import first from 'lodash.first'
import last from 'lodash.last'
import range from 'lodash.range'
import sortBy from 'lodash.sortby'

export function findDirection (draft) {
  return (
    draft.map(letter => letter.parentElement.getAttribute('row'))
      .reduce((a, b) => { return (a === b) ? a : false }) ||
    draft.map(letter => letter.parentElement.getAttribute('col'))
      .reduce((a, b) => { return (a === b) ? a : false })
  )
  // letters are not arranged in the same row or column --> REJECT
}

export function rearrange (draft, line) {
  if (isNaN(line)) {
    return sortBy(draft, letter => parseInt(letter.parentElement.getAttribute('col'), 10))
  } else {
    return sortBy(draft, letter => letter.parentElement.getAttribute('row').charCodeAt())
  }
}

export function findGaps (word, line) {
  var filled = tryFillGaps(word, line)
  if (filled.every(item => item)) {
    return filled // return word including filled word
  } else {
    return false // reject incomplete words
  }
}

function tryFillGaps (word, line) {
  var start, end
  if (isNaN(line)) {
    start = parseInt(first(word).parentElement.getAttribute('col'), 10)
    end = parseInt(last(word).parentElement.getAttribute('col'), 10) + 1
    return range(start, end).map(fill => checkForLetter(line, fill))
  } else {
    start = first(word).parentElement.getAttribute('row').charCodeAt()
    end = last(word).parentElement.getAttribute('row').charCodeAt() + 1
    var list = range(start, end).map(item => String.fromCharCode(item))
    return list.map(fill => checkForLetter(fill, line))
  }
}

export function isValidFirstMove (word) {
  // check if word is on starting tile
  if (word.map(letter => letter.parentElement).some(parent => includes(Array.from(parent.classList), 'start-tile'))) {
    return true
  } else {
    return false
  }
}

export function isConnectedToExistingLetters (word) {
  var parents = word.map(letter => letter.parentElement)
  // some parent needs to be adjacent to an existing letter
  return parents.some(parent => {
    var parentRow = parent.getAttribute('row').charCodeAt()
    var parentCol = parseInt(parent.getAttribute('col'), 10)
    return [[String.fromCharCode(parentRow + 1), parentCol],
            [String.fromCharCode(parentRow - 1), parentCol],
            [String.fromCharCode(parentRow), parentCol + 1],
            [String.fromCharCode(parentRow), parentCol - 1]]
              .some(check => checkForLetter(...check, '.set'))
  })
}

// check if target element contains a letter
export function checkForLetter (targetRow, targetCol, el = '.letter-piece') {
  return document.body.querySelector('#' + targetRow + targetCol).querySelector(el)
}
