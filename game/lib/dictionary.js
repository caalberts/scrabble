import includes from 'lodash.includes'

export function checkDictionary (library, words) {
  return words.map(word => {
    (word.map(tile => tile.textContent).join(''))
  }).every(word => includes(library, word))
}

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
