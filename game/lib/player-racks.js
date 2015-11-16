// Draw racks and score board using DOM manipulation
export default function drawRacks (player) {
  var racks = Array.from(document.querySelectorAll('.' + player + '-rack'))
  racks.forEach(rack => {
    for (var i = 0; i < 7; i++) {
      var slot = document.createElement('div')
      slot.className = 'slot-' + i
      slot.className = 'slot ' + slot.className + ' ' + player + '-' + slot.className
      slot.classList.add('empty-slot')
      rack.appendChild(slot)
    }
  })
}
