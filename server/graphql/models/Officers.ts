export class Officers {
  constructor(protected model: any) {}

  getAll() {
    return this.model.find({});
  }

  getById(id) {
    return this.model.findById(id);
  }
}
