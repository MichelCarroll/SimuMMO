
import {Command} from '../Command';

export default class WaitCommand implements Command {

  execute() {

  }

  describe() {
    return ``;
  }

  getTurnCooldown():number {
    return 0;
  }

  getReward():number {
    return -1;
  }
}
