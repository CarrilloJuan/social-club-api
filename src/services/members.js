import crypto from 'crypto';
import { membersModel } from '../models';
import CommonsServiceOperations from './commons';
import { DataModelError } from '../utils/customErrors';

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
      await this.model.create(data);
      return id;
    } catch (error) {
      throw new DataModelError(error.code, 'creatingUser', id);
    }
  }

  async subscribeActivities(memberId, activities) {
    try {
      return await this.model.subscribeActivities(memberId, activities);
    } catch (error) {
      throw new DataModelError(error.code, 'subscribingActivities', {
        message: error.message,
        code: 'unavailable',
      });
    }
  }

  async unsubscribeActivities(memberId, activities) {
    try {
      return await this.model.unsubscribeActivities(memberId, activities);
    } catch (error) {
      throw new DataModelError(error.code, 'unsubscribingActivities');
    }
  }

  async consumeActivity(memberId, consumption) {
    try {
      return await this.model.consumeActivity(memberId, consumption);
    } catch (error) {
      throw new DataModelError(error.code, 'consumingActivity');
    }
  }
}

export default new MembersService(membersModel);
