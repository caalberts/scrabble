import includes from 'lodash.includes'

export function calculateLetterScore (letter) {
  const letterBase = parseInt(letter.getAttribute('score'), 10)
  const letterMultiplier = includes(letter.classList, 'set') ? 1 : parseInt(letter.parentElement.getAttribute('letterX'), 10)
  console.log(letterBase + ' * ' + letterMultiplier)
  return letterBase * letterMultiplier
}

export function calculateWordScore (word) {
  const wordBase = word.map(letter => calculateLetterScore(letter))
    .reduce((total, score) => { return total + score })
  const wordMultiplier = word.map(letter => {
    if (includes(letter.classList, 'set')) {
      return 1
    } else {
      return parseInt(letter.parentElement.getAttribute('wordX'), 10)
    }
  }).reduce((total, multiplier) => { return total * multiplier })
  console.log(wordBase + ' * ' + wordMultiplier)
  return wordBase * wordMultiplier
}
