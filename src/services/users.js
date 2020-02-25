import admin from 'firebase-admin';
import { DataModelError } from '../utils/customErrors';

class users {
  constructor(model) {
    this.model = model;
  }

  async create(userInfo) {
    try {
      return await this.model.createUser({
        displayName: userInfo.firstName,
        ...userInfo,
      });
    } catch (error) {
      throw new DataModelError(error.code, 'creatingUser', error.errorInfo);
    }
  }

  async get(userId) {
    try {
      return await this.model.getUser(userId);
    } catch (error) {
      throw new DataModelError(error.code, 'gettingUser', error.errorInfo);
    }
  }

  async update(userId, userData) {
    try {
      return await this.model.updateUser(userId, { ...userData });
    } catch (error) {
      throw new DataModelError(error.code, 'updatingUser', error.errorInfo);
    }
  }

  async remove(userId) {
    try {
      return this.model.deleteUser(userId);
    } catch (error) {
      throw new DataModelError(error.code, 'removingUser', error.errorInfo);
    }
  }

  async getAll() {
    try {
      const { users = [] } = await this.model.listUsers();
      return users.map(userRecord => userRecord.toJSON());
    } catch (error) {
      throw new DataModelError(error.code, 'gettingUsers', error.errorInfo);
    }
  }
}

// TODO: Create a separate user model
const usersModel = admin.auth();

export default new users(usersModel);
