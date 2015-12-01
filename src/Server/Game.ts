
import CommandQueue from './CommandQueue';
import Scheduler from './Scheduler';
import WorldGenerator from './Generator/WorldGenerator';
import {Command} from './Command';

export default class Game {

  commandQueue:CommandQueue;
  scheduler:Scheduler;

  constructor() {
    this.commandQueue = new CommandQueue();
    this.scheduler = new Scheduler(this.executeCommand.bind(this));
  }

  getCommandQueue():CommandQueue {
    return this.commandQueue;
  }

  executeCommand(command:Command) {
    this.commandQueue.queue(command);
    this.commandQueue.flush();
  }

  run(numTurns:number) {
    for(let x = 0; x < numTurns; x++) {
      this.scheduler.nextTurn();
    }
  }
}
