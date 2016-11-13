const
  fs = require('fs'),
  Config = require('./src/config');

class App {
  constructor(inputPath) {
    if (inputPath == undefined) {
      console.warn('No file specified!');
      inputPath = 'input.js';

      // return;
    }

    let _this = this;
    let inputPromise = this.inputPromise(inputPath);
    let configPromise = this.configPromise();

    // Initialize app when all assets is fetched
    Promise.all([inputPromise, configPromise]).then(function (results) {
      _this.init(_this.remapFetchedData(results));
    }).catch(function (err) {
      console.warn(err);
    });
  }

  /**
   * Extracts inner object keys as array keys with values
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
   * Reads input file from command line argument
   * @returns {Promise}
   */
  inputPromise(path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (err, contents) {
        if (err) reject(err);

        resolve({ input: contents });
      });
    });
  }

  /**
   * Fetches config objects from api provided in config
   * @returns {Promise}
   */
  configPromise() {
    return new Promise(function (resolve, reject) {
      let config = new Config();

      config.fetchConfigs((err, results) => {
        if (err) reject(err);

        resolve({ config: results() });
      });
    });
  }

  init(data) {
    this.input = data.input;
    this.config = data.config;
  }
}
module.exports = App;

let app = new App(process.argv[2]);
