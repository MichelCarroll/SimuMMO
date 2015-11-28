
import CommandQueue from './CommandQueue';
import Scheduler from './Scheduler';
import WorldGenerator from './Generator/WorldGenerator';
import {Command} from './Command';
import GameObject from './GameObject';

export default class Game {

  commandQueue:CommandQueue;
  world:GameObject;
  scheduler:Scheduler;
  player:GameObject;

  constructor() {
    this.commandQueue = new CommandQueue();
    this.scheduler = new Scheduler(this.executeCommand.bind(this));
    this.world = (new WorldGenerator()).generate(this.scheduler);
    this.player = this.world.oneOfType('town').oneOfType('player');
  }

  executeCommand(command:Command) {
    this.commandQueue.queue(command);
    this.commandQueue.flush();
  }

  run(numTurns:number, onDone:()=>void) {
    setImmediate(() => {
      this.scheduler.nextTurn((actionDone:boolean) => {
          if(numTurns-- < 0) {
            onDone();
          } else {
            this.run(numTurns, onDone)
          }
      });
    });
  }

  debug() {
    // console.log(require('util').inspect(this.world, true, 10))
    this.commandQueue.debug();
  }
}
