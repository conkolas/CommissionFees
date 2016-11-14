const TransactionRepo = require('./../src/transaction-repo');

describe('TransactionRepo', function () {

  beforeEach(function(){
    TransactionRepo.clear();
  });

  it('should save transaction records', function() {
    let transaction = {
      date:       '2016-01-05',
      user_id:    1,
      user_type:  'natural',
      type:       'cash_out',
      operation:  { amount: 200.00, currency: 'EUR' },
    };

    TransactionRepo.save(transaction).should.be.a('object');
  });

  it('should find all transaction records', function() {
    let transaction = {
      date:       '2016-01-05',
      user_id:    1,
      user_type:  'natural',
      type:       'cash_out',
      operation:  { amount: 200.00, currency: 'EUR' },
    };

    TransactionRepo.save(transaction);
    TransactionRepo.save(transaction);
    TransactionRepo.findAll().should.be.length(2);
  });
});
