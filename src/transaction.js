class Transaction {
  constructor(opt) {
    this.date       = opt.date;
    this.user_id    = opt.user_id;
    this.user_type  = opt.user_type;
    this.type       = opt.type;
    this.operation  = opt.operation;
    this.taxes      = 0;
    this.total      = opt.operation.amount;
  }
}

module.exports = Transaction;
