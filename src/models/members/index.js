import { firestore } from 'firebase-admin';
import ActivitiesModel from '../activities';
import CommonsModelOperations from '../commons';
import db from '../../db';
import { exitOnError } from 'winston';

class MembersModel extends CommonsModelOperations {
  constructor(collectionRef) {
    super(collectionRef);
    this.collectionRef = collectionRef;
  }

  async subscribeActivities(memberId, activities) {
    await db.runTransaction(async tx => {
      for await (const activity of activities) {
        const activityRef = await ActivitiesModel.collection.doc(activity);
        const exists = (await tx.get(activityRef)).exists;
        if (!exists)
          throw new Error(`There isn\'t an activity called: ${activity}`);
      }
      return tx.update(
        this.collectionRef.doc(memberId),
        'activities',
        firestore.FieldValue.arrayUnion(...activities),
      );
    });
  }

  async unsubscribeActivities(memberId, activities) {
    await db.update(
      this.collectionRef.doc(memberId),
      'activities',
      firestore.FieldValue.arrayRemove(...activities),
    );
  }
}

const collectionRef = db.collection('members');

export default new MembersModel(collectionRef);
