class CurrencyConverter {
  constructor(config) {
    this.config = config;
    this.defaultCurrency = Object.keys(this.config)[0];
  }

  /**
   * Converts object of currency type and amount to
   * value representing default currency
   * @param object
   * @returns {*}
   */
  convert(object) {
    if (object.currency == this.defaultCurrency) return object.amount;
    let converted = object.amount / this.config[this.defaultCurrency][object.currency];
    return this.round(converted);
  }

  /**
   * Ceils number second decimal place to larger value
   * @param number
   * @returns {number}
   */
  round(number) {
    return Math.ceil(number * 100) / 100;
  }
}

module.exports = CurrencyConverter;
