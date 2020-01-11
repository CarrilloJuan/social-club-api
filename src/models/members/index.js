import BasicModelOperations from '../basicModelOperations';

class MembersModel extends BasicModelOperations {
  constructor(collectionName) {
    super(collectionName);
  }
}

export default new MembersModel('users');
