import db from '../../db';

class UserModel {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  register(user) {
    this.collection.doc(user.id).set(user);
    return user;
  }

  update(user) {
    this.collection.doc(user.id).set(
      {
        ...user,
      },
      { merge: true },
    );
  }

  remove(userId) {
    this.collection.doc(userId).delete();
  }

  async get(userId) {
    const user = await this.collection.doc(userId).get();
    return user;
  }

  async getAll() {
    const users = await this.collection.get();
    return users;
  }
}

export default new UserModel('users');
