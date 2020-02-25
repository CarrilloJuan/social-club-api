import Firestore from '../db/firestore';
import CommonsServiceOperations from './commons';

class ActivitiesService extends CommonsServiceOperations {
  constructor(dataModel) {
    super(dataModel);
    this.dataModel = dataModel;
  }

  async checkActivity(activity) {
    return (await this.dataModel.get(activity)).exists;
  }
}

const dataModel = new Firestore('activities');

export default new ActivitiesService(dataModel);
