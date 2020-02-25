import crypto from 'crypto';
import Firestore from '../db/firestore';
import { firestore } from 'firebase-admin';
import { ActivitiesService } from '../services';
import CommonsServiceOperations from './commons';
import { DataModelError } from '../utils/customErrors';
import { monthNames } from '../utils/date';

class MembersService extends CommonsServiceOperations {
  constructor(model) {
    super(model);
    this.dataModel = model;
  }

  async create(data) {
    const id = crypto
      .createHash('md5')
      .update(data.dni)
      .digest('hex');
    data.id = id;
    try {
      await this.dataModel.create(data);
      return id;
    } catch (error) {
      throw new DataModelError(error.code, 'creatingUser', id);
    }
  }

  async subscribeActivities(memberId, activities) {
    try {
      return await Firestore.db.runTransaction(async tx => {
        for await (const activity of activities) {
          const exists = await ActivitiesService.checkActivity(activity);
          if (!exists)
            throw new Error(`There isn\'t an activity called: ${activity}`);
        }
        return tx.update(
          this.dataModel.collectionRef.doc(memberId),
          'activities',
          firestore.FieldValue.arrayUnion(...activities),
        );
      });
    } catch (error) {
      throw new DataModelError(error.code, 'subscribingActivities', {
        message: error.message,
        code: 'unavailable',
      });
    }
  }

  async unsubscribeActivities(memberId, activities) {
    try {
      return this.dataModel.collectionRef
        .doc(memberId)
        .update('activities', firestore.FieldValue.arrayRemove(...activities));
    } catch (error) {
      throw new DataModelError(error.code, 'unsubscribingActivities');
    }
  }

  async consumeActivity(memberId, consumption) {
    try {
      const { activity, time } = consumption;
      const exists = await ActivitiesService.checkActivity(activity);
      if (!exists)
        throw new Error(`There isn\'t an activity called: ${activity}`);
      return await Firestore.db.runTransaction(async tx => {
        const consumptionsCollectionRef = ActivitiesService.dataModel.collectionRef
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
    } catch (error) {
      throw new DataModelError(error.code, 'consumingActivity', error);
    }
  }
}
const dataModel = new Firestore('members');

export default new MembersService(dataModel);
