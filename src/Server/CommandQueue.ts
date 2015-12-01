
import {Command} from './Command';
import {Emitter} from '../Common/Emitter';

declare interface Subscriber{(data:Object):void};

export default class CommandQueue implements Emitter {

    queuePosition:number;
    commandQueue:Command[];
    subscribers:Subscriber[];

    constructor() {
      this.queuePosition = 0;
      this.commandQueue = [];
      this.subscribers = [];
    }

    subscribe(subscriber:Subscriber) {
      this.subscribers.push(subscriber);
    }

    queue(command:Command) {
      this.commandQueue.push(command);
    }

    flush() {
      let nextCommand:Command;
      while(nextCommand = this.getNextCommand()) {
        nextCommand.execute();
        this.subscribers.forEach((subscriber:Subscriber) => {
          subscriber(nextCommand.describe());
        });
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
