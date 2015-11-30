
import CommandQueue from './CommandQueue';
import Scheduler from './Scheduler';
import WorldGenerator from './Generator/WorldGenerator';
import {Command} from './Command';
import GameObject from './GameObject';
import PlayerAgent from './Agent/PlayerAgent';

export default class Game {

  commandQueue:CommandQueue;
  world:GameObject;
  scheduler:Scheduler;
  playerAgent:PlayerAgent;

  constructor() {
    this.commandQueue = new CommandQueue();
    this.scheduler = new Scheduler(this.executeCommand.bind(this));
    this.playerAgent = (new WorldGenerator()).generate(this.scheduler);
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

  exportPlayerAgentBrain():any {
    return this.playerAgent.exportBrain();
  }

  debug() {
    // console.log(require('util').inspect(this.world, true, 10))
    this.commandQueue.debug();
  }
}
