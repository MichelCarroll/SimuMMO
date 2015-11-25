

import Being from '../Being'
import WoodenStick from '../Item/WoodenStick';

export default class MonsterGenerator {

  generate() {
    let monster = new Being(['monster']);
    monster.getInventory().giveMoney(1);
    monster.add(new WoodenStick(5));
    return monster;
  }

}
