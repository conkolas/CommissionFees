const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const Config = require('../src/config');

chai.use(chaiAsPromised);

describe('Configuration', function () {
  let _config = new Config();

  it('should have cash_in property', function () {
    Config.getAPI().should.have.property('cash_in').with.not.length(0);
  });

  it('should have cash_out_natural property', function () {
    Config.getAPI().should.have.property('cash_out_natural').with.not.length(0);
  });

  it('should have cash_out_juridical property', function () {
    Config.getAPI().should.have.property('cash_out_juridical').with.not.length(0);
  });

  it('should have rates property', function () {
    Config.getAPI().should.have.property('rates').with.not.length(0);
  });

  it('should fetch config object', function (done) {
    let fetchConfig = _config.getConfigPromise(
      'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
      'cash_in'
    );

    return expect(fetchConfig.then(done())).to.eventually.be.a('object').with.key('cash_in');
  });
});
