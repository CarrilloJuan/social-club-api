import db from '../../db';
import CommonsModelOperations from '../commons';

class ActivitiesModel extends CommonsModelOperations {
  constructor(collection) {
    super(collectionRef);
    this.activitiesRef = collectionRef;
  }

  async checkIfExists(activity) {
    const activityRef = this.activitiesRef.doc(activity);
    return (await activityRef.get()).exists;
  }
}

const collectionRef = db.collection('activities');

export default new ActivitiesModel(collectionRef);
