

import GameObject from '../../Common/GameObject'
import MoneyPurse from '../Components/MoneyPurse';
import Constitution from '../Components/Constitution';

export default class PlayerGenerator {

  generate() {
    let monster = new GameObject(['player']);
    monster.addComponent(new MoneyPurse());
    monster.addComponent(new Constitution(monster));
    return monster;
  }

}
