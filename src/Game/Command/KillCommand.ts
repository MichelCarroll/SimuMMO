
import {Command} from '../Command';
import Being from '../Being';

export default class KillCommand implements Command {

  self:Being;
  target:Being;

  constructor(self:Being, target:Being) {
    this.self = self;
    this.target = target;
  }

  execute() {
    this.self.injure(10);
    this.self.getInventory().giveMoney(this.target.getInventory().getMoney());
    this.self.takeAll(this.target);
    this.target.getParent().remove(this.target);
  }

  describe() {
    return `Player #${this.self.id} killed Monster #${this.target.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
