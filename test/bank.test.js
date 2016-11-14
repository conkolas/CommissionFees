const chai = require('chai');
const should = chai.should();
const Bank = require('../src/bank');

describe('Bank', function () {
  let bank = new Bank();

  it('should accept cash in transactions', function () {
    let cashIn = {
      amount:   200,
      currency: 'EUR',
      type:     'cash_in',
    };

    let executed = bank.executeTransaction(cashIn);
    executed.should.not.null;
    // executed.should.have.property('tax').and.have.property('total');
  });
});
