

export default class CommandQueue {

    constructor() {
      this.queuePosition = 0;
      this.commandQueue = [];
    }

    queue(command) {
      this.commandQueue.push(command);
    }

    flush() {
      let nextCommand = null;
      while(nextCommand = this.getNextCommand()) {
        nextCommand.execute();
      }
    }

    getNextCommand() {
      if(this.queuePosition < this.commandQueue.length) {
        return this.commandQueue[this.queuePosition++];
      }
    }

}
