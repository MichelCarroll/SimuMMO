
import {Command} from '../Command';

export default class WaitCommand implements Command {

  execute() {

  }

  describe() {
    return `Waiting`;
  }

  getTurnCooldown():number {
    return 0;
  }
}
