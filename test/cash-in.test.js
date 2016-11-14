const CashInTransaction = require('./../src/cash-in');

describe('CashInTransition', function () {
  let config = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };

  it('should calculate taxes according to config', function () {
    let transaction = {
      date:       '2016-01-05',
      user_id:    1,
      user_type:  'natural',
      type:       'cash_in',
      operation:  { amount: 200.00, currency: 'EUR' },
    };

    let cashInTransaction = new CashInTransaction(transaction, config);
    cashInTransaction.execute().taxes.should.be.equal(0.06);
  });

  it('should set max value', function () {
    let transaction = {
      date:       '2016-01-05',
      user_id:    1,
      user_type:  'natural',
      type:       'cash_in',
      operation:  { amount: 200000.00, currency: 'EUR' },
    };

    let cashInTransaction = new CashInTransaction(transaction, config);
    cashInTransaction.execute().taxes.should.be.equal(5);
  });
});
