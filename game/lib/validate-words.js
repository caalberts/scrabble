// function to check if all submitted tiles are connected in a row or a column
export function isConnected (word) {
  // check if it's in a row or column
  var row = word.map(letter => letter.parentElement.getAttribute('row')).reduce((a, b) => { return (a === b) ? a : false })
  var col = word.map(letter => letter.parentElement.getAttribute('col')).reduce((a, b) => { return (a === b) ? a : false })

  if (row) {
    // if tiles are in a row, check if columns are adjacent
    return word.map(letter => letter.parentElement.getAttribute('col')).sort()
      .reduce((a, b) => { return ((b - a) === 1) ? b : false })
  } else if (col) {
    // if tiles are in a column, check if rows are adjacent
    return word.map(letter => letter.parentElement.getAttribute('row').charCodeAt()).sort()
      .reduce((a, b) => { return ((b - a) === 1) ? b : false })
  }
}
