const CurrencyConverter = require('../src/currency-converter');

describe('CurrencyConverter', function(){
  let config = {
    EUR: {
      USD: 1.1497,
      JPY: 129.53
    }
  };
  let converter = new CurrencyConverter(config);

  it('should convert from USD to EUR', function(){
    converter.convert({ currency: 'USD', amount: 1 }).should.be.equal(0.87);
  })
})