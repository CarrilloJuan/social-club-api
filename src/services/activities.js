import { activitiesModel } from '../models';
import CommonsServiceOperations from './commons';

class ActivitiesService extends CommonsServiceOperations {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

export default new ActivitiesService(activitiesModel);
