let Repo = [];

class TransactionRepo {
  static findAll() {
    return Repo;
  }

  static save(_this) {
    Repo.push(_this);
    return _this;
  }

  static clear() {
    Repo = [];
    return Repo;
  }

  static findWhere(recordKey, value) {
    return Repo.filter(function (record) {
      return record[recordKey] == value;
    });
  }
}

module.exports = TransactionRepo;
