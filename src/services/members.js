import { membersModel } from '../models';
import BasicServiceOperations from './basicServiceOperations';

class MembersService extends BasicServiceOperations {
  constructor(model) {
    super(model);
  }
}

export default new MembersService(membersModel);
