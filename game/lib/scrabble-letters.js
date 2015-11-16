// Create an array of 100 tiles
// Each tile is a JS object with properties 'letter' and 'score'
var letters = []
createLetters('a', 9, 1)
createLetters('b', 2, 3)
createLetters('c', 2, 3)
createLetters('d', 4, 2)
createLetters('e', 12, 1)
createLetters('f', 2, 4)
createLetters('g', 3, 2)
createLetters('h', 2, 4)
createLetters('i', 9, 1)
createLetters('j', 1, 8)
createLetters('k', 1, 3)
createLetters('l', 4, 1)
createLetters('m', 2, 3)
createLetters('n', 6, 1)
createLetters('o', 8, 1)
createLetters('p', 2, 3)
createLetters('q', 1, 10)
createLetters('r', 6, 1)
createLetters('s', 4, 1)
createLetters('t', 6, 1)
createLetters('u', 4, 1)
createLetters('v', 2, 4)
createLetters('w', 2, 4)
createLetters('x', 1, 8)
createLetters('y', 2, 4)
createLetters('z', 1, 10)

function createLetters (letter, count, score) {
  var tile = {
    'letter': letter,
    'score': score
  }
  for (var i = 0; i < count; i++) {
    letters.push(tile)
  }
}

export default letters
