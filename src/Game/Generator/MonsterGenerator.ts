

import GameObject from '../GameObject'
import Valuable from '../Components/Valuable';
import Inventory from '../Components/Inventory';
import Constitution from '../Components/Constitution';

export default class MonsterGenerator {

  generate() {
    let monster = new GameObject(['monster']);
    monster.addComponent(new Inventory());
    monster.addComponent(new Constitution());
    monster.getComponent<Inventory>('inventory').giveMoney(1);
    let item = new GameObject(['item']);
    item.addComponent(new Valuable(5));
    monster.add(item);
    return monster;
  }

}
