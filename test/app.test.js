const chai = require('chai'),
  should = chai.should(),
  chaiAsPromised = require('chai-as-promised'),
  App = require('../app');

chai.use(chaiAsPromised);

describe('App', function () {
  let app = new App('input.js');
  describe('should have access to', function () {
    it('input data', function () {
      let inputPromise = app.inputPromise('input.js');
      return inputPromise.should.eventually.be.a('object').with.key('input');
    });

    it('config data', function () {
      let configPromise = app.configPromise();
      return configPromise.should.eventually.be.a('object').with.key('config');
    });
  });
});
