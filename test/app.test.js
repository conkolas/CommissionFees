const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const App = require('../app');

chai.use(chaiAsPromised);

describe('Application', function () {
  let app = new App('input.json');
  let inputPromise = app.inputPromise('input.json');
  let configPromise = app.configPromise();

  it('should have access to input data', function () {
    return expect(inputPromise).to.eventually.be.a('object').with.key('input');
  });

  it('should have access to config data', function () {
    return expect(configPromise).to.eventually.be.a('object').with.key('config');
  });

});
