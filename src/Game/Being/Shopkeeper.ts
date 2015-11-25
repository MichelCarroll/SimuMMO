
import Being from '../Being';

export default class Shopkeeper extends Being {

  getObjectTypes() {
    return super.getObjectTypes().concat(['shopkeeper']);
  }
}
