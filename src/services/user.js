import uuidv4 from 'uuid/v4';
import { userModel } from '../models';
import CustomError from '../utils/customError';

class UserService {
  async registerUser(userData) {
    try {
      userData.id = uuidv4();
      const newUser = await userModel.register(userData);
      return newUser;
    } catch (error) {
      throw new CustomError(error.message, 'registeringUser');
    }
  }

  async updateUser(user) {
    try {
      userModel.update(user);
    } catch (error) {
      throw new CustomError(error.message, 'updatingUser');
    }
  }

  async removeUser(userId) {
    try {
      userModel.remove(userId);
    } catch (error) {
      throw new CustomError(error.message, 'removeUser');
    }
  }

  async getUser(userId) {
    try {
      const user = await userModel.get(userId);
      if (!user.exists) {
        console.log('No such document!');
      } else {
        return user.data();
      }
    } catch (error) {
      throw new CustomError(error.message, 'gettingUser');
    }
  }

  async getUsers() {
    try {
      let users = [];
      (await userModel.getAll()).forEach(user => users.push(user.data()));
      return users;
    } catch (error) {
      throw new CustomError(error.message, 'gettingUsers');
    }
  }
}

export default new UserService();
