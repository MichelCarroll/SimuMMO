
import Being from '../Being';

export default class Monster extends Being {

  getRewardMoney() {
    return 1;
  }

  getObjectTypes() {
    return super.getObjectTypes().concat(['monster']);
  }

}
