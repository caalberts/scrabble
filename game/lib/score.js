import includes from 'lodash'

export function calculateLetterScore (letter) {
  const letterBase = parseInt(letter.getAttribute('score'), 10)
  const letterMultiplier = includes(letter.classList, 'set') ? 1 : findMultiplier(letter, 'letter')
  return letterBase * letterMultiplier
}

// export function calculateWordScore (word) {
//   const wordBase = word.map(letter => calculateLetterScore(letter))
//     .reduce((total, score) => { return total + score })
//   const wordMultiplier = word.map(letter => {
//     return includes(letter.classList, 'set') ? 1 : findMultiplier(letter, 'word')
//   }).reduce((total, multiplier) => { return total * multiplier })
//   return wordBase * wordMultiplier
// }

function findMultiplier (el, type) {
  return parseInt(el.parentElement.getAttribute(type + 'X'), 10)
}
