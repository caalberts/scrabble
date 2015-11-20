import includes from 'lodash.includes'

export function checkDictionary (library, words) {
  return words.map(word => {
    return word.map(tile => tile.textContent).join('').toString().toLowerCase()
  }).every(word => {
    return includes(library, word)
  })
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
