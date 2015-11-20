// Create an array of 100 tiles
// Each tile is a JS object with properties 'letter' and 'score'
var letters = [
  ['a', 9, 1],
  ['b', 2, 3],
  ['c', 2, 3],
  ['d', 4, 2],
  ['e', 12, 1],
  ['f', 2, 4],
  ['g', 3, 2],
  ['h', 2, 4],
  ['i', 9, 1],
  ['j', 1, 8],
  ['k', 1, 5],
  ['l', 4, 1],
  ['m', 2, 3],
  ['n', 6, 1],
  ['o', 8, 1],
  ['p', 2, 3],
  ['q', 1, 10],
  ['r', 6, 1],
  ['s', 4, 1],
  ['t', 6, 1],
  ['u', 4, 1],
  ['v', 2, 4],
  ['w', 2, 4],
  ['x', 1, 8],
  ['y', 2, 4],
  ['z', 1, 10]
]
  .map(letter => createLetters(...letter))
  .reduce((all, each) => all.concat(each), [])

function createLetters (letter, count, score) {
  var tile = {
    'letter': letter,
    'score': score
  }
  var available = []
  for (var i = 0; i < count; i++) {
    available.push(tile)
  }
  return available
}

export default letters
