const CashOutJuridicalTransaction = require('./../src/cash-out-juridical');

describe('CashOutJuridicalTransaction', function () {
  let config = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };

  it('should calculate taxes according to juridical config', function () {
    let juridicalCashOut = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'juridical',
      type: 'cash_out',
      operation: { amount: 200.00, currency: 'EUR' },
    };

    let cashOutJuridicalTransaction = new CashOutJuridicalTransaction(juridicalCashOut, config);
    cashOutJuridicalTransaction.execute().taxes.should.be.equal(0.6);
  });

  it('should set max value', function () {
    let juridicalCashOut = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'juridical',
      type: 'cash_out',
      operation: { amount: 100.00, currency: 'EUR' },
    };

    let cashOutJuridicalTransaction = new CashOutJuridicalTransaction(juridicalCashOut, config);
    cashOutJuridicalTransaction.execute().taxes.should.be.equal(0.5);
  });
});
