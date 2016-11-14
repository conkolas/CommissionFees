const CashOutNaturalTransaction = require('./../src/cash-out-natural');

describe('CashOutNaturalTransaction', function () {
  let config = { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } };
  it('should calculate weekly limit ', function () {
    let transaction0 = {
      date:       '2016-11-14',
      user_id:    2,
      user_type:  'natural',
      type:       'cash_out',
      operation:  { amount: 200.00, currency: 'EUR' },
    };
    let transaction1 = {
      date:       '2016-11-14',
      user_id:    2,
      user_type:  'natural',
      type:       'cash_out',
      operation:  { amount: 300.00, currency: 'EUR' },
    };
    let transaction2 = {
      date:       '2016-11-15',
      user_id:    2,
      user_type:  'natural',
      type:       'cash_out',
      operation:  { amount: 1000.00, currency: 'EUR' },
    };

    let cashOutNaturalTransaction0 = new CashOutNaturalTransaction(transaction0, config);
    let cashOutNaturalTransaction1 = new CashOutNaturalTransaction(transaction1, config);
    let cashOutNaturalTransaction2 = new CashOutNaturalTransaction(transaction2, config);
    cashOutNaturalTransaction0.execute();
    cashOutNaturalTransaction1.execute();
    cashOutNaturalTransaction2.execute().taxes.should.be.equal(1.5);
  });
});
