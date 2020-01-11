import BasicModelOperations from '../basicModelOperations';

class ActivitiesModel extends BasicModelOperations {
  constructor(collectionName) {
    super(collectionName);
  }
}

export default new ActivitiesModel('activities');
