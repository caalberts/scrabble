/* global describe it */

import chai from 'chai'
import calculateLetterScore from '../game/lib/score.js'

const expect = chai.expect

describe('calculateLetterScore', () => {
  it('should return the score of a letter with bonus applied', () => {
    // create test element
    const letter = 'X'
    expect(calculateLetterScore(letter).to.equal('X'))
  })
})
