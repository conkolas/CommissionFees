const Transaction = require('./transaction');
const TransactionRepo = require('./transaction-repo');

class CashOutNaturalTransaction extends Transaction {
  constructor(opt, config) {
    super(opt);

    this.config = config;
  }

  execute() {
    this.taxes = this.calculateTaxes(this.config);
    this.total -= this.taxes;

    TransactionRepo.save(this);
    return this;
  }

  /**
   * Returns taxes depending on config values
   * @param config
   * @returns {number}
   */
  calculateTaxes(config) {
    return (this.exceededWeekLimit() * config.percents) / 100;
  }

  /**
   * Returns exceeded weekly amount with current transaction amount
   * @returns {number}
   */
  exceededWeekLimit() {
    let startDate = this.getMonday(this.date);
    let endDate = new Date(this.date);
    let currentLimit = Math.max(0, this.config.week_limit.amount - this.currentWeekUsage(startDate, endDate));

    return Math.max(0, this.operation.amount - currentLimit);
  }

  /**
   * Returns amount of money that was already cashed out this week
   * @param startDate
   * @param endDate
   * @returns {number}
   */
  currentWeekUsage(startDate, endDate) {
    let usage = 0;
    let userTransactions = this.getWeeklyTransactions(this.user_id, startDate, endDate);
    userTransactions.forEach(function (transaction) {
      usage += transaction.operation.amount;
    });

    return usage;
  }

  /**
   * Returns current week transactions of current transaction user
   * @param startDate
   * @param endDate
   * @returns {Array}
   */
  getWeeklyTransactions(userId, startDate, endDate) {
    return TransactionRepo.findWhere('user_id', userId).filter(function (transaction) {
      let transactionDate = new Date(transaction.date);
      let isCashOutNatural = (transaction.type == 'cash_out' && transaction.user_type == 'natural');
      let isInRange = (+startDate <= +transactionDate && +transactionDate <= +endDate);

      return isInRange && isCashOutNatural;
    });
  }

  /**
   * Returns current transaction week start date
   * @param date
   * @return {Date}
   */
  getMonday(date) {
    date = new Date(date);
    var day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}

module.exports = CashOutNaturalTransaction;
