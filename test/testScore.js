/* global describe it */
import sinon from 'sinon'
import chai from 'chai'
import { calculateLetterScore } from '../game/lib/score.js'

const expect = chai.expect

describe('calculateLetterScore', () => {
  it('should return the score of a letter with bonus applied', () => {
    let letter = {
      // getAttribute: () => 2,
      getAttribute: sinon.stub().returns(2),
      classList: ['abc', 'set']
    }
    expect(calculateLetterScore(letter)).to.equal(2)
    expect(letter.getAttribute.calledOnce).to.be.true
    expect(letter.getAttribute.calledWith('score')).to.be.true
  })
})
