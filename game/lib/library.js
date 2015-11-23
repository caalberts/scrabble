var fs = require('fs')

// sync readFile
// const sowpods = fs.readFileSync(__dirname + '/sowpods.txt', 'utf8').split('\n')

// async readFile
const sowpods = fs.readFileSync(__dirname + '/sowpods.txt', 'utf8', (err, library) => {
  if (err) console.log(err)
  return library.split('\n')
})

export default sowpods
