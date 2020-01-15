import CustomError from '../utils/customError';

export default class CommonsServiceOperations {
  constructor(model) {
    this.model = model;
  }

  async create(resource) {
    try {
      return await this.model.create(resource);
    } catch (error) {
      throw new CustomError(error.message, 'savingResourceDb');
    }
  }

  async get(resourceId) {
    try {
      const resource = await this.model.get(resourceId);
      if (!resource.exists) {
        console.log('No such resource!');
      } else {
        return resource.data();
      }
    } catch (error) {
      throw new CustomError(error.message, 'gettingResourceDb');
    }
  }

  async update(resourceId, data) {
    try {
      return await this.model.update(resourceId, data);
    } catch (error) {
      throw new CustomError(error.message, 'updatingResourceDb');
    }
  }

  async remove(id) {
    try {
      return this.model.remove(id);
    } catch (error) {
      throw new CustomError(error.message, 'removingResourceDb');
    }
  }

  async getAll() {
    try {
      return await this.model.getAll();
    } catch (error) {
      throw new CustomError(error.message, 'gettingResourcesDb');
    }
  }
}
