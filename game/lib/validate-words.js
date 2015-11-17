import includes from 'lodash.includes'
// function to check if all submitted tiles are connected in a row or a column
export default function validate (word) {
  var direction
  // check if it's in a row or column
  if (word.map(letter => letter.parentElement.getAttribute('row')).reduce((a, b) => { return (a === b) ? a : false })) {
    direction = 'row'
  } else if (word.map(letter => letter.parentElement.getAttribute('col')).reduce((a, b) => { return (a === b) ? a : false })) {
    direction = 'col'
  } else {
    return false
  }

  return (
    (document.body.querySelector('.set') || isFirstMoveValid(word)) && // validate first move
    isConnected(word, direction) // && // validate if all tiles are connected in a row or column
    // isConnectedToExistingWords(word, direction) // validate if word connects to existing tiles
  )
    // validate if all words formed are English words
}

function isConnected (word, direction) {
  switch (direction) {
    case 'row':
      return word.map(letter => letter.parentElement.getAttribute('col')).sort()
        .reduce((a, b) => { return ((b - a) === 1) ? b : false })
    case 'col':
      return word.map(letter => letter.parentElement.getAttribute('row').charCodeAt()).sort()
        .reduce((a, b) => { return ((b - a) === 1) ? b : false })
    default:
      return false
  }

  // if (row) {
  //   // if tiles are in a row, check if columns are adjacent
  //   return word.map(letter => letter.parentElement.getAttribute('col')).sort()
  //     .reduce((a, b) => { return ((b - a) === 1) ? b : false })
  // } else if (col) {
  //   // if tiles are in a column, check if rows are adjacent
  //   return word.map(letter => letter.parentElement.getAttribute('row').charCodeAt()).sort()
  //     .reduce((a, b) => { return ((b - a) === 1) ? b : false })
  // }
}

function isFirstMoveValid (word) {
  return word.map(letter => letter.parentElement).some(parent => includes(Array.from(parent.classList), 'start-tile'))
}

function isConnectedToExistingWords (word, direction) {
  var parents = word.map(letter => letter.parentElement)
  console.log(parents)
  // some parent must be adjacent to existing letter
  // parents.some(parent => [checkUp, checkLeft, checkRight, checkDown])
  // if row
  // parent-1 -- checkUp, checkDown, checkLeft
  // parent-n -- checkUp, checkDown
  // parent-last -- checkUp, checkDown, checkLeft

  // if col
  // parent-1 -- checkLeft, checkRight, checkUp
  // parent-n -- checkLeft, checkRight
  // parent-last -- checkLeft, checkRight, checkDown
}
