
import Being from '../Being';
import {Command} from '../Command';

export default class RestCommand implements Command {

  self:Being;

  constructor(self:Being) {
    this.self = self;
  }

  execute() {
    this.self.rest(10);
  }

  describe() {
    return `Player #${this.self.id} rested`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
