

import Being from '../Being'

export default class MonsterGenerator {

  generate() {
    let monster = new Being(['monster']);
    monster.getInventory().giveMoney(1);
    return monster;
  }

}
