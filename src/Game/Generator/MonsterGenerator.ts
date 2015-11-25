

import Monster from '../Being/Monster'

export default class MonsterGenerator {

  generate() {
    let monster = new Monster();
    monster.getInventory().giveMoney(1);
    return monster;
  }

}
