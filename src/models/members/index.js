import { firestore } from 'firebase-admin';
import ActivitiesModel from '../activities';
import CommonsModelOperations from '../commons';
import db from '../../db';
import { monthNames } from '../../utils/date';

class MembersModel extends CommonsModelOperations {
  constructor(collectionRef) {
    super(collectionRef);
    this.membersRef = collectionRef;
  }

  async subscribeActivities(memberId, activities) {
    await db.runTransaction(async tx => {
      for await (const activity of activities) {
        const activityRef = ActivitiesModel.activitiesRef.doc(activity);
        const exists = (await tx.get(activityRef)).exists;
        if (!exists)
          throw new Error(`There isn\'t an activity called: ${activity}`);
      }
      return tx.update(
        this.membersRef.doc(memberId),
        'activities',
        firestore.FieldValue.arrayUnion(...activities),
      );
    });
  }

  async unsubscribeActivities(memberId, activities) {
    await this.membersRef
      .doc(memberId)
      .update('activities', firestore.FieldValue.arrayRemove(...activities));
  }

  async consumeActivity(memberId, consumption) {
    const { activity, time } = consumption;
    await db.runTransaction(async tx => {
      const consumptionsCollectionRef = ActivitiesModel.activitiesRef
        .doc(activity)
        .collection('consumptions');
      const monthlyConsumptionRef = consumptionsCollectionRef.doc(
        `${monthNames[new Date().getMonth()]}-${new Date().getFullYear()}`,
      );
      await tx.set(
        monthlyConsumptionRef,
        {
          time: firestore.FieldValue.increment(Number(time)),
        },
        { merge: true },
      );
      return tx.set(
        this.membersRef.doc(memberId),
        {
          consumption: {
            [activity]: firestore.FieldValue.increment(Number(time)),
          },
        },
        { merge: true },
      );
    });
  }
}

const collectionRef = db.collection('members');

export default new MembersModel(collectionRef);
