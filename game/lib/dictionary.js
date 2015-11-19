var fs = require('fs')

const stream = fs.readFileSync(__dirname + '/sowpods.txt')
const sowpods = window.atob(stream).split('\n')
