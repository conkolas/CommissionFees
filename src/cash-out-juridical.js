const Transaction = require('./transaction');

class CashOutJuridicalTransaction extends Transaction {
  constructor(opt, config) {
    super(opt);

    this.config = config;
  }

  execute() {
    this.taxes = this.calculateTaxes(this.config);
    this.total -= this.taxes;
    return this;
  }

  /**
   * Returns taxes depending on config values
   * @param config
   * @returns {number}
   */
  calculateTaxes(config) {
    return Math.max(config.min.amount, (this.total * config.percents) / 100);
  }
}

module.exports = CashOutJuridicalTransaction;
