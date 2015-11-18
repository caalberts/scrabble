var level = require('level-browserify')

var db = level('../db')

export function checkDictionary (words) {
  Promise.all(words.map(word => getDictionary(word))
    .then(scores => {
      return scores
    }))
}

function getDictionary (word) {
  db.get(word, function (error, score) {
    if (error) {
      if (!error.notFound) {
        console.log(error)
      }
    } else {
      return score
    }
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
