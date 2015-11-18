import * as validate from './validate-words.js'

// step back in the opposite direction
  // recurse until the end
  // then step forward until the end
  // save word into an array

export function findWords (start, line) {
  var wordStart = move(start, line, -1)
  return move(wordStart, line, 1, 'trace')
}

// move along the line until the start or the end of the line with option to trace
function move (start, line, direction, option, result = []) {
  var startIndex, next
  if (isNaN(line)) {
    startIndex = parseInt(start.parentElement.getAttribute('col'), 10)
    next = validate.checkForLetter(line, startIndex + direction * 1)
  } else {
    startIndex = start.parentElement.getAttribute('row').charCodeAt()
    next = validate.checkForLetter(String.fromCharCode(startIndex + direction * 1), line)
  }
  if (option === 'trace') {
    result.push(start)
    if (next) {
      return move(next, line, direction, option, result)
    } else {
      console.log('return: ' + result)
      return result
    }
  } else if (next) {
    return move(next, line, direction, option)
  } else {
    return start
  }
}
