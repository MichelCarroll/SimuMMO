import {Command} from '../Command';
import GameObject from '../../Common/GameObject';
import Valuable from '../Components/Valuable';
import GiveMoney from '../Event/GiveMoney';
import LoseMoney from '../Event/LoseMoney';

export default class SellCommand implements Command {

  seller:GameObject;
  buyer:GameObject;
  valuable:GameObject;

  constructor(seller:GameObject, buyer:GameObject, valuable:GameObject) {
    this.seller = seller;
    this.buyer = buyer;
    this.valuable = valuable;
  }

  execute() {
    let basePrice = (<Valuable>this.valuable.getComponent('valuable')).getBasePrice();
    let moneyChangingHands = basePrice;
    this.seller.remove(this.valuable);
    this.buyer.add(this.valuable);
    this.seller.trigger(new GiveMoney(moneyChangingHands));
    this.buyer.trigger(new LoseMoney(moneyChangingHands));
  }

  describe() {
    return `Player #${this.seller.id} sold a valuable to Shopkeep #${this.buyer.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
