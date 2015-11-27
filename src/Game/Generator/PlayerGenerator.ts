

import GameObject from '../GameObject'
import Inventory from '../Components/Inventory';
import Constitution from '../Components/Constitution';

export default class PlayerGenerator {

  generate() {
    let monster = new GameObject(['player']);
    monster.addComponent(new Inventory());
    monster.addComponent(new Constitution());
    return monster;
  }

}
