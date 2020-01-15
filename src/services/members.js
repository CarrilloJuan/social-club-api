import crypto from 'crypto';
import { membersModel } from '../models';
import CommonsServiceOperations from './commons';
import CustomError from '../utils/customError';

class MembersService extends CommonsServiceOperations {
  constructor(model) {
    super(model);
    this.model = model;
  }

  async create(data) {
    const id = crypto
      .createHash('md5')
      .update(data.dni)
      .digest('hex');
    data.id = id;
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new CustomError(error.message, 'savingResourceDb');
    }
  }

  async subscribeActivities(memberId, activities) {
    try {
      return await this.model.subscribeActivities(memberId, activities);
    } catch (error) {
      throw new CustomError(error.message, 'subscribingActivities');
    }
  }

  async unsubscribeActivities(memberId, activities) {
    try {
      return await this.model.unsubscribeActivities(memberId, activities);
    } catch (error) {
      throw new CustomError(error.message, 'unsubscribingActivities');
    }
  }
}

export default new MembersService(membersModel);
