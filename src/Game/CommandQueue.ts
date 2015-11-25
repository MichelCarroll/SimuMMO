
import {Command} from './Command';

export default class CommandQueue {

    queuePosition:number;
    commandQueue:Command[];

    constructor() {
      this.queuePosition = 0;
      this.commandQueue = [];
    }

    queue(command:Command) {
      this.commandQueue.push(command);
    }

    flush() {
      let nextCommand:Command;
      while(nextCommand = this.getNextCommand()) {
        nextCommand.execute();
      }
    }

    getNextCommand() {
      if(this.queuePosition < this.commandQueue.length) {
        return this.commandQueue[this.queuePosition++];
      }
    }

    debug() {
      this.commandQueue.forEach((cmd, i) => {
        let description = cmd.describe();
        if(description) {
           console.log(`#${i}: ${description}`);
        }
      });
    }
}
