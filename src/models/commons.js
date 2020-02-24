export default class CommonsModelOperations {
  constructor(collection) {
    this.collectionRef = collection;
  }

  async create(resource) {
    await this.collectionRef.doc(resource.id).create(resource);
    return resource.id;
  }

  async update(resourceId, data) {
    return await this.collectionRef.doc(resourceId).update({
      ...data,
    });
  }

  async remove(resourceId) {
    return await this.collectionRef.doc(resourceId).delete();
  }

  async get(resourceId) {
    return await this.collectionRef.doc(resourceId).get();
  }

  async getAll() {
    const resources = [];
    (await this.collectionRef.get()).forEach(resource =>
      resources.push(resource.data()),
    );
    return resources;
  }
}
