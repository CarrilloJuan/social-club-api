import { DataModelError } from '../utils/customErrors';

export default class CommonsServiceOperations {
  constructor(dataModel) {
    this.dataModel = dataModel;
  }

  async create(resource) {
    try {
      await this.dataModel.create(resource);
      return resource.id;
    } catch (error) {
      throw new DataModelError(error.code, 'creating', error, resource.id);
    }
  }

  async get(id) {
    try {
      const resource = await this.dataModel.get(id);
      if (!resource.exists) {
        throw new Error('No such resource!');
      } else {
        return resource.data();
      }
    } catch (error) {
      throw new DataModelError(error.code, 'getting', error, id);
    }
  }

  // TODO: check if exists
  async update(id, data) {
    try {
      return await this.dataModel.update(id, data);
    } catch (error) {
      throw new DataModelError(error.code, 'updating', error, id);
    }
  }

  async remove(id) {
    try {
      return await this.dataModel.remove(id);
    } catch (error) {
      throw new DataModelError(error.code, 'removing', error, id);
    }
  }

  async getAll() {
    try {
      return await this.dataModel.getAll();
    } catch (error) {
      throw new DataModelError(error.code, 'gettingAll', error);
    }
  }
}
