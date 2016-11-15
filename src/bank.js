const CashInTransaction = require('./cash-in');
const CashOutNaturalTransaction = require('./cash-out-natural');
const CashOutJuridicalTransaction = require('./cash-out-juridical');
const CurrencyConverter = require('./currency-converter');

class Bank {
  constructor(config) {
    this.config = config;
    this.currencyConverter = new CurrencyConverter(this.config.rates);
  }

  /**
   * Executes transaction instances depending on its type
   * returns executed transaction with saved taxes and total value
   * @param transaction
   * @returns {*}
   */
  executeTransaction(transaction) {
    let executedTransaction = null;

    transaction = this.convertAmountCurrency(transaction);

    switch (transaction.type) {
      case 'cash_in': {
        let cashIn = new CashInTransaction(transaction, this.config.cash_in);
        executedTransaction = cashIn.execute();
        break;
      }

      case 'cash_out': {
        switch (transaction.user_type) {
          case 'natural': {
            let cashOutNatural =
              new CashOutNaturalTransaction(transaction, this.config.cash_out_natural);
            executedTransaction = cashOutNatural.execute();
            break;
          }

          case 'juridical': {
            let cashOutJuridical =
              new CashOutJuridicalTransaction(transaction, this.config.cash_out_juridical);
            executedTransaction = cashOutJuridical.execute();
            break;
          }
        }
      }
    }

    return this.roundTaxes(executedTransaction);
  }

  /**
   * Sets transaction amount to main currency value
   * @param transaction
   * @returns {*}
   */
  convertAmountCurrency(transaction) {
    transaction.operation.amount = this.currencyConverter.convert({
      currency: transaction.operation.currency,
      amount: transaction.operation.amount,
    });

    return transaction;
  }

  roundTaxes(transaction) {
    transaction.taxes = this.currencyConverter.round(transaction.taxes).toFixed(2);
    return transaction;
  }
}

module.exports = Bank;
