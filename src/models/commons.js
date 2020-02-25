export default class CommonsModelOperations {
  constructor(dataModel) {
    this.dataModel = dataModel;
  }

  async create(resource) {
    await this.dataModel.create(resource);
  }

  async update(resourceId, data) {
    await this.dataModel.update(resourceId, data);
  }

  async remove(resourceId) {
    await this.dataModel.remove(resourceId);
  }

  async get(resourceId) {
    return this.dataModel.get(resourceId);
  }

  async getAll() {
    return dataModel.getAll();
  }
}
