import { activitiesModel } from '../models';
import BasicServiceOperations from './basicServiceOperations';

class ActivitiesService extends BasicServiceOperations {
  constructor(model) {
    super(model);
  }
}

export default new ActivitiesService(activitiesModel);
