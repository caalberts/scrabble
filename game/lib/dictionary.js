import level from 'level-browserify'
import Promise from 'bluebird'

var db = Promise.promisifyAll(level('db'))

export function checkDictionary (words) {
  return Promise.all(words.map(word => {
    getDictionary(word.map(tile => tile.textContent).join('').toString().toLowerCase())
  }))
}

function getDictionary (word) {
  console.log('searching dictionary for: ' + word)
  return new Promise((resolve, reject) => {
    db.getAsync(word, function (error, score) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(score)
      }
    })
  })
}

// async function getDictionary (word) {
//   const result = await db.getAsync(word)
//   console.log(result)
//   return result
// }

// async function checkDictionary (words) {
//   return await * words.map(word => getDictionary(word))
// }
//
// async function getDictionary (word) {
//   return await db.get(word, function (error, score) {
//     if (error) {
//       if (!error.notFound) {
//         console.log(error)
//       }
//     } else {
//       return score
//     }
//   })
// }
