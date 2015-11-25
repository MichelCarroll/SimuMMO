
import Being from '../Being';

export default class Player extends Being {

  getObjectTypes() {
    return super.getObjectTypes().concat(['player']);
  }

}
