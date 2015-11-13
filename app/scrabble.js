// Draw scrabble board using DOM manipulation
var board = document.querySelector('.board')
var cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o']
var rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
rows.forEach(row => {
  var line = document.createElement('div')
  line.className = 'row ' + row + ' row-' + row
  cols.forEach(col => {
    var tile = document.createElement('div')
    tile.className = 'tile ' + 'row-' + row + ' ' + 'col-' + col
    tile.id = col + row
    line.appendChild(tile).classList.add(col + row)
  })
  board.appendChild(line)
})
// mark special tiles
document.querySelector('#h8').classList.add('start-tile')
var doubleLetterTiles = ['d1', 'l1']
