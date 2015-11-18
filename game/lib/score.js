export function calculateLetterScore (letter) {
  const letterBase = parseInt(letter.getAttribute('score'), 10)
  const letterMultiplier = parseInt(letter.parentElement.getAttribute('letterX'), 10)
  return letterBase * letterMultiplier
}

export function calculateWordScore (word) {
  const wordBase = word.map(letter => calculateLetterScore(letter))
    .reduce((total, score) => { return total + score })
  const wordMultiplier = word.map(letter => parseInt(letter.parentElement.getAttribute('wordX'), 10))
    .reduce((total, multiplier) => { return total * multiplier })
  return wordBase * wordMultiplier
}
