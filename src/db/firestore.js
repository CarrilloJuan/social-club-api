import admin from 'firebase-admin';
import config from '../config';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.credentialsPath),
});

const db = admin.firestore();

export default class Firestore {
  static db = db;
  constructor(collection) {
    this.collectionRef = db.collection(collection);
  }

  async create(resource) {
    await this.collectionRef.doc(resource.id).create(resource);
  }

  async update(resourceId, data) {
    await this.collectionRef.doc(resourceId).update({
      ...data,
    });
  }

  async remove(resourceId) {
    await this.collectionRef.doc(resourceId).delete();
  }

  async get(resourceId) {
    return this.collectionRef.doc(resourceId).get();
  }

  async getAll() {
    const resources = [];
    (await this.collectionRef.get()).forEach(resource =>
      resources.push(resource.data()),
    );
    return resources;
  }
}
