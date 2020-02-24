import db from '../../db';
import CommonsModelOperations from '../commons';

class ActivitiesModel extends CommonsModelOperations {
  constructor(collectionRef) {
    super(collectionRef);
    this.activitiesRef = collectionRef;
  }

  async checkIfExists(activity) {
    const activityRef = this.activitiesRef.doc(activity);
    return (await activityRef.get()).exists;
  }
}

const activitiesRef = db.collection('activities');

export default new ActivitiesModel(activitiesRef);
