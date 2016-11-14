const fs = require('fs');
const Config = require('./src/config');
const Bank = require('./src/bank');

class App {
  constructor(inputPath) {
    if (inputPath == undefined) {
      console.warn('No file specified!');
      inputPath = 'input.json';

      // return;
    }

    // Initialize app when all assets is fetched
    let assets = [this.inputPromise(inputPath), this.configPromise()];
    this.fetchAssets(this, assets, this.initialize);
  }

  fetchAssets(_this, assetsPromises, callback) {
    Promise.all(assetsPromises).then(function (results) {
      callback(false, _this, results);
    }).catch(function (err) {
      callback(err, _this, null);
    });
  }

  /**
   * Sets input and config params from data object
   * Creates Bank instance and iterates execution of transactions
   *
   * @param data
   */
  initialize(err, _this, data) {
    if (err) {
      console.warn(err.message);
      return false;
    }

    let applicationData = _this.remapFetchedData(data);

    _this.bank = new Bank(applicationData.config);

    applicationData.input.forEach(function(transaction){
      let executedTransaction = _this.bank.executeTransaction(transaction);
      console.log(executedTransaction.taxes);
    });
  }

  /**
   * Extracts inner object keys as array keys with values
   *
   * @param results
   * @returns {Array}
   */
  remapFetchedData(results) {
    let appData = [];

    results.forEach(function (result) {
      Object.keys(result).forEach(function (key) {
        appData[key] = result[key];
      });
    });

    return appData;
  }

  /**
   * Reads input file from path
   *
   * @returns {Promise}
   */
  inputPromise(path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (err, contents) {
        if (err) reject(err.message);

        resolve({ input: JSON.parse(contents) });
      });
    });
  }

  /**
   * Fetches config objects from api provided in config
   *
   * @returns {Promise}
   */
  configPromise() {
    return new Promise(function (resolve, reject) {
      let config = new Config();

      config.fetchConfigs((err, results) => {
        if (err) reject(err.message);

        resolve({ config: results() });
      });
    });
  }
}
module.exports = App;

let app = new App(process.argv[2]);
