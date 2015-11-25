
import Being from '../Being';

export default class Monster extends Being {

  getObjectTypes() {
    return super.getObjectTypes().concat(['monster']);
  }

}
