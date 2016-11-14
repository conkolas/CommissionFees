const chai = require('chai');
const should = chai.should();
const Bank = require('../src/bank');

describe('Bank', function () {
  let bankConfig = {
      cash_in: {
        percents: 0.03, max: {
          amount: 5, currency: 'EUR',
        },
      },
      cash_out_natural: {
        percents: 0.3, week_limit: {
          amount: 1000, currency: 'EUR',
        },
      },
      cash_out_juridical: {
        percents: 0.3, min: {
          amount: 0.5, currency: 'EUR',
        },
      },
      rates: {
        EUR: {
          USD: 1.1497, JPY: 129.53,
        },
      },
    }
    ;
  let bank = new Bank(bankConfig);

  it('should execute cash in transactions', function () {
    let cashIn = {
      operation: {
        amount: 200,
        currency: 'EUR',
      },
      type: 'cash_in',
    };
    let executed = bank.executeTransaction(cashIn);
    executed.should.not.null;
  });

  it('should accept cash out for natural user', function () {
    let cashOutNatural = {
      date: '2016-01-06',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 30000, currency: 'EUR' }
    };

    let executed = bank.executeTransaction(cashOutNatural);
    executed.should.not.null;
  });

  it('should accept cash out for juridical user', function () {
    let cashOutJuridical = {
      date:       '2016-01-05',
      user_id:    1,
      user_type:  'juridical',
      type:       'cash_out',
      operation:  { amount: 200.00, currency: 'EUR' },
    };

    let executed = bank.executeTransaction(cashOutJuridical);
    executed.should.not.null;
  });
});
