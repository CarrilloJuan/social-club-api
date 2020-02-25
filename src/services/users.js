import admin from 'firebase-admin';
import { DataModelError } from '../utils/customErrors';

class users {
  constructor(dataModel) {
    this.dataModel = dataModel;
  }

  async create(userInfo) {
    try {
      return await this.dataModel.createUser({
        displayName: userInfo.firstName,
        ...userInfo,
      });
    } catch (error) {
      throw new DataModelError(error.code, 'creatingUser', error.errorInfo);
    }
  }

  async get(userId) {
    try {
      return await this.dataModel.getUser(userId);
    } catch (error) {
      throw new DataModelError(error.code, 'gettingUser', error.errorInfo);
    }
  }

  async update(userId, userData) {
    try {
      return await this.dataModel.updateUser(userId, { ...userData });
    } catch (error) {
      throw new DataModelError(error.code, 'updatingUser', error.errorInfo);
    }
  }

  async remove(userId) {
    try {
      return this.dataModel.deleteUser(userId);
    } catch (error) {
      throw new DataModelError(error.code, 'removingUser', error.errorInfo);
    }
  }

  async getAll() {
    try {
      const { users = [] } = await this.dataModel.listUsers();
      return users.map(userRecord => userRecord.toJSON());
    } catch (error) {
      throw new DataModelError(error.code, 'gettingUsers', error.errorInfo);
    }
  }
}

const usersModel = admin.auth();

export default new users(usersModel);
