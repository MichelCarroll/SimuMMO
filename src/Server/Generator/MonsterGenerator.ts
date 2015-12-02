

import GameObject from '../../Common/GameObject'
import Valuable from '../Components/Valuable';
import MoneyPurse from '../Components/MoneyPurse';
import Constitution from '../Components/Constitution';

export default class MonsterGenerator {

  generate() {
    let monster = new GameObject(['monster']);
    monster.addComponent(new MoneyPurse());
    monster.addComponent(new Constitution());
    monster.getComponent<MoneyPurse>('moneyPurse').giveMoney(5);
    let item = new GameObject(['item']);
    let valuable = new Valuable();
    valuable.setBasePrice(5);
    item.addComponent(valuable);
    monster.add(item);
    return monster;
  }

}
