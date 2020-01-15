import db from '../../db';
import CommonsModelOperations from '../commons';

class ActivitiesModel extends CommonsModelOperations {
  constructor(collection) {
    super(collectionRef);
    this.collectionRef = collectionRef;
  }

  async checkIfExists(activity) {
    const activityRef = this.collectionRef.doc(activity);
    return (await activityRef.get()).exists;
  }
}

const collectionRef = db.collection('activities');

export default new ActivitiesModel(collectionRef);
