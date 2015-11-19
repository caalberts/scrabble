// import level from 'level-browserify'
// import Promise from 'bluebird'
import fs from 'fs'
import includes from 'lodash.includes'
// var db = Promise.promisifyAll(level('db'))

const sowpods = fs.readFileSync('./sowpods.txt').split('\n')

export function checkDictionary (words) {
  return words.map(word => {
    (word.map(tile => tile.textContent).join(''))
  }).every(word => includes(sowpods, word))
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
