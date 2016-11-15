const request = require('request');

/* API url locations for getting app options */
const API = {
  cash_in: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
  cash_out_natural: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural',
  cash_out_juridical: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical',
  rates: 'http://private-38e18c-uzduotis.apiary-mock.com/rates',
};

module.exports = class Config {

  static getAPI() {
    return API;
  }

  /**
   * Executes config Promises and returns array with mapped values
   *
   * @param configPromises
   * @returns {Array}
   */
  fetchConfigs(callback) {
    let _this = this;
    Promise.all(this.collectApiPromises(API)).then(function (configResults) {
      callback(false, function () {
        return _this.remapConfigResults(configResults);
      });
    }).catch(function (err) {
      console.warn(err.message);
    });
  }

  /**
   * Maps each config object key to single object new key
   * {{key1: value1}, {key2: value2}} => {key1: value1, key2: value2}
   *
   * @param configResults
   * @returns {Array}
   */
  remapConfigResults(configResults) {
    let mapTypeValue = [];
    if (configResults.length > 0)
      configResults.forEach((result) => {
        if (result)
          Object.keys(result).forEach((key) => {
            mapTypeValue[key] = result[key];
          });
      });
    return mapTypeValue;
  }

  /**
   * Collects requests for config objects as Promises
   *
   * @param config
   * @returns {Array}
   */
  collectApiPromises(api) {
    let configPromises = [];
    Object.keys(api).forEach((configType) => {
      configPromises.push(this.getConfigPromise(API[configType], configType));
    });

    return configPromises;
  }

  /**
   * Returns config Promise which returns object
   * with single key representing config type and its value
   *
   * @param url
   * @param configType
   * @returns {Promise}
   */
  getConfigPromise(url, configType) {
    return new Promise(function (resolve, reject) {
      request(url, function (err, response, body) {
        if (err) reject(err.message);
        if (body) {
          let configObject = {};
          configObject[configType] = JSON.parse(body);
          resolve(configObject);
        }
      });
    });
  }
};
