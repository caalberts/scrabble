// Draw scrabble board using DOM manipulation
var board = document.querySelector('.board')
var rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o']
var cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

rows.forEach(row => {
  var line = document.createElement('div')
  line.className = 'row ' + row + ' row-' + row
  cols.forEach(col => {
    var tile = document.createElement('div')
    tile.className = 'tile ' + 'row-' + row + ' ' + 'col-' + col
    tile.id = row + col
    line.appendChild(tile).classList.add(row + col)
  })
  board.appendChild(line)
})
// mark special tiles
//
document.querySelector('#h8').classList.add('start-tile')
var doubleLetterTiles = ['a4', 'a12',
                         'c7', 'c9',
                         'd1', 'd8', 'd15',
                         'g3', 'g7', 'g9', 'g13',
                         'h4', 'h12',
                         'i3', 'i7', 'i9', 'i13',
                         'l1', 'l8', 'l15',
                         'm7', 'm9',
                         'o4', 'o12']
var tripleLetterTiles = ['b6', 'b10',
                         'f2', 'f6', 'f10', 'f14',
                         'j2', 'j6', 'j10', 'j14',
                         'n6', 'n10']
var doubleWordTiles = ['b2', 'b14',
                       'c3', 'c13',
                       'd4', 'd12',
                       'e5', 'e11',
                       'k5', 'k11',
                       'l4', 'l12',
                       'm3', 'm13',
                       'n2', 'n14']
var tripleWordTiles = ['a1', 'a8', 'a15',
                       'h1', 'h15',
                       'o1', 'o8', 'o15']
doubleLetterTiles.forEach(tile => document.querySelector('.' + tile).classList.add('double-letter'))
tripleLetterTiles.forEach(tile => document.querySelector('.' + tile).classList.add('triple-letter'))
doubleWordTiles.forEach(tile => document.querySelector('.' + tile).classList.add('double-word'))
tripleWordTiles.forEach(tile => document.querySelector('.' + tile).classList.add('triple-word'))

// board map
// 1 - standard tile
// 21 - 2L tile
// 31 - 3L tile
// 22 - 2W tile
// 32 - 3W tile
// 99 - starting tile
// var boardMap = [[32, 1, 1, 21, 1, 1, 1, 32, 1, 1, 1, 21, 1, 1, 32],
//                 [1, 22, 1, 1, 1, 31, 1, 1, 1, 31, 1, 1, 1, 22, 1],
//                 [1, 1, 22, 1, 1, 1, 21, 1, 21, 1, 1, 1, 22, 1, 1],
//                 [21, 1, 1, 22, 1, 1, 1, 21, 1, 1, 1, 22, 1, 1, 21],
//                 [1, 1, 1, 1, 22, 1, 1, 1, 1, 1, 22, 1, 1, 1, 1],
//                 [1, 31, 1, 1, 1, 31, 1, 1, 1, 31, 1, 1, 1, 31, 1],
//                 [1, 1, 21, 1, 1, 1, 21, 1, 21, 1, 1, 1, 21, 1, 1],
//                 [32, 1, 1, 21, 1, 1, 1, 99, 1, 1, 1, 21, 1, 1, 32],
//                 [1, 1, 21, 1, 1, 1, 21, 1, 21, 1, 1, 1, 21, 1, 1],
//                 [1, 31, 1, 1, 1, 31, 1, 1, 1, 31, 1, 1, 1, 31, 1],
//                 [1, 1, 1, 1, 22, 1, 1, 1, 1, 1, 22, 1, 1, 1, 1],
//                 [21, 1, 1, 22, 1, 1, 1, 21, 1, 1, 1, 22, 1, 1, 21],
//                 [1, 1, 22, 1, 1, 1, 21, 1, 21, 1, 1, 1, 22, 1, 1],
//                 [1, 22, 1, 1, 1, 31, 1, 1, 1, 31, 1, 1, 1, 22, 1],
//                 [32, 1, 1, 21, 1, 1, 1, 32, 1, 1, 1, 21, 1, 1, 32]]
// boardMap.forEach((row, rowIndex) => {
//   var rowNumber = rowIndex + 1
//   var line = document.createElement('div')
//   line.className = 'row ' + ' row-' + rowNumber
//   row.forEach((col, colIndex) => {
//     var colNumber = colIndex + 1
//     var tile = document.createElement('div')
//     tile.className = 'tile ' + 'row-' + rowNumber + ' ' + 'col-' + colNumber
//     tile.id = rowNumber + colNumber
//     // add special classes for bonus tiles
//     switch (col) {
//       case '21':
//         tile.classList.add('double-letter')
//         break;
//       case '31':
//         tile.classList.add('triple-letter')
//         break;
//       case '22':
//         tile.classList.add('double-word')
//         break;
//       case '32':
//         tile.classList.add('triple-word')
//         break;
//       case '99':
//         tile.classList.add('start-tile')
//         break;
//       default:
//
//     }
//     line.appendChild(tile).classList.add(rowNumber + colNumber)
//   })
//   board.appendChild(line)
// })
