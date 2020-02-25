import Firestore from '../../db/firestore';
import CommonsModelOperations from '../commons';

class ActivitiesModel extends CommonsModelOperations {
  constructor(dataModel) {
    super(dataModel);
    this.dataModel = dataModel;
  }

  async checkActivity(activity) {
    return (await this.get(activity)).exists;
  }
}

const dataModel = new Firestore('activities');

export default new ActivitiesModel(dataModel);
