const chai = require('chai'),
  should = chai.should(),
  chaiAsPromised = require('chai-as-promised'),
  Config = require('../src/config');

chai.use(chaiAsPromised);

describe('Config', function () {
  let _config = new Config();
  let configAPI = Config.getAPI();

  it('should have cash_in property', function () {
    configAPI.should.have.property('cash_in').with.not.length(0);
  });

  it('should have cash_out_natural property', function () {
    configAPI.should.have.property('cash_out_natural').with.not.length(0);
  });

  it('should have cash_out_juridical property', function () {
    configAPI.should.have.property('cash_out_juridical').with.not.length(0);
  });

  it('should have rates property', function () {
    configAPI.should.have.property('rates').with.not.length(0);
  });

  describe('#getConfigPromises', function () {
    it('should fetch config object', function () {
      let result = _config.getConfigPromise(
        'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
        'cash_in'
      );

      return result.should.eventually.be.a('object').with.key('cash_in');
    });
  });
});
