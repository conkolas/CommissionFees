class Bank {
  constructor(config) {
    this.config = config;
  }

  executeTransaction(transaction) {
    let executed;
    switch (transaction.type){
      case 'cash_in': {
        return {};
        break;
      }

      default: {
        return executed;
      }
    }
  }
}

module.exports = Bank;
