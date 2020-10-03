class Officers {
  constructor(model) {
    this.Model = model;
  }

  getAll() {
    return this.Model.find({});
  }

  getById(id) {
    return this.Model.findById(id);
  }
}

module.exports = Officers;
