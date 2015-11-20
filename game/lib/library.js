var fs = require('fs')

const sowpods = fs.readFileSync(__dirname + '/sowpods.txt', 'utf8').split('\n')

export default sowpods

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
