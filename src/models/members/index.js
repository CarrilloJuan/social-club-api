import ActivitiesModel from '../activities';
import CommonsModelOperations from '../commons';
import { firestore } from 'firebase-admin';
import Firestore from '../../db/firestore';
import { monthNames } from '../../utils/date';

class MembersModel extends CommonsModelOperations {
  constructor(dataModel) {
    super(dataModel);
    this.dataModel = dataModel;
  }

  async subscribeActivities(memberId, activities) {
    await Firestore.db.runTransaction(async tx => {
      for await (const activity of activities) {
        const exists = await ActivitiesModel.checkActivity(activity);
        if (!exists)
          throw new Error(`There isn\'t an activity called: ${activity}`);
      }
      return tx.update(
        this.dataModel.collectionRef.doc(memberId),
        'activities',
        firestore.FieldValue.arrayUnion(...activities),
      );
    });
  }

  async unsubscribeActivities(memberId, activities) {
    await this.dataModel.collectionRef
      .doc(memberId)
      .update('activities', firestore.FieldValue.arrayRemove(...activities));
  }

  async consumeActivity(memberId, consumption) {
    const { activity, time } = consumption;
    await Firestore.db.runTransaction(async tx => {
      const consumptionsCollectionRef = ActivitiesModel.dataModel.collectionRef
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
        this.dataModel.collectionRef.doc(memberId),
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

const dataModel = new Firestore('members');

export default new MembersModel(dataModel);
