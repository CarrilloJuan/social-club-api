import { activitiesModel } from '../models';
import CommonsServiceOperations from './commons';

class ActivitiesService extends CommonsServiceOperations {
  constructor(model) {
    super(model);
    this.model = model;
  }

  async checkAvailability(activities) {
    let exists;
    for (let activity of activities) {
      exists = await this.model.checkIfExists(activity);
      if (exists === false) break;
    }
    return exists;
  }
}

export default new ActivitiesService(activitiesModel);
