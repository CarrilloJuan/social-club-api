import db from '../db';
import uuidv4 from 'uuid/v4';

export default class BasicModelOperations {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async create(resource) {
    resource.id = uuidv4();
    await this.collection.doc(resource.id).set(resource);
    return resource.id;
  }

  async update(resource) {
    return await this.collection.doc(resource.id).set(
      {
        ...resource,
      },
      { merge: true },
    );
  }

  async remove(resourceId) {
    return await this.collection.doc(resourceId).delete();
  }

  async get(resourceId) {
    return await this.collection.doc(resourceId).get();
  }

  async getAll() {
    const resources = [];
    (await this.collection.get()).forEach(resource =>
      resources.push(resource.data()),
    );
    return resources;
  }
}
