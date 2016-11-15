const fs = require('fs');
const Config = require('./src/config');
const Bank = require('./src/bank');

class App {
  constructor(inputPath) {
    if (inputPath == undefined) {
      console.warn('No file specified!');
      return;
    }

    // Initialize app when all assets is fetched
    let assets = [this.inputPromise(inputPath), this.configPromise()];
    this.fetchAssets(this, assets, this.initialize);
  }

  fetchAssets(_this, assetsPromises, callback) {
    Promise.all(assetsPromises).then(function (results) {
      callback(false, _this, results);
    }).catch(function (err) {
      console.warn(err.message);
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

    // Separates input and API config data
    let applicationData = _this.remapFetchedData(data);

    // Setup bank instance with fetched config data
    _this.bank = new Bank(applicationData.config);

    // Execute every transaction from input data and write taxes to stdout
    applicationData.input.forEach(function (transaction) {
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

    if (results)
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

        if (typeof results == 'function')
          resolve({ config: results() });
      });
    });
  }
}
module.exports = App;

let app = new App(process.argv[2]);
