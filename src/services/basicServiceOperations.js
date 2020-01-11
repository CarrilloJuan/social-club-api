import CustomError from '../utils/customError';

export default class BasicServiceOperations {
  // TODO: check if the model is valid
  constructor(model) {
    this.model = model;
  }

  async create(resourceData) {
    try {
      return await this.model.create(resourceData);
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

  async update(resourceId) {
    try {
      return await this.model.update(resourceId);
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
