import { DataModelError } from '../utils/customErrors';

export default class CommonsServiceOperations {
  constructor(model) {
    this.model = model;
  }

  async create(resource) {
    try {
      return await this.model.create(resource);
    } catch (error) {
      throw new DataModelError(error.code, 'creating', resource.id);
    }
  }

  async get(id) {
    try {
      const resource = await this.model.get(id);
      if (!resource.exists) {
        console.log('No such resource!');
      } else {
        return resource.data();
      }
    } catch (error) {
      throw new CustomError(error.message, 'getting', id);
    }
  }

  async update(id, data) {
    try {
      return await this.model.update(id, data);
    } catch (error) {
      throw new CustomError(error.message, 'updating', id);
    }
  }

  async remove(id) {
    try {
      return this.model.remove(id);
    } catch (error) {
      throw new CustomError(error.message, 'removing', id);
    }
  }

  async getAll() {
    try {
      return await this.model.getAll();
    } catch (error) {
      throw new CustomError(error.message, 'gettingAll');
    }
  }
}
