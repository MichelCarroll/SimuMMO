
import CommandQueue from './CommandQueue';
import Scheduler from './Scheduler';
import TrainerWorldGenerator from './Generator/TrainerWorldGenerator';
import WorldGenerator from './Generator/WorldGenerator';
import {Command} from './Command';
import GameObject from '../Common/GameObject';
import PlayerAgent from './Agent/PlayerAgent';

export default class Game {

  commandQueue:CommandQueue;
  world:GameObject;
  scheduler:Scheduler;
  playerAgent:PlayerAgent;

  constructor(options:any = {}) {
    this.commandQueue = new CommandQueue();
    this.scheduler = new Scheduler(this.executeCommand.bind(this));

    if(options.training) {
        this.playerAgent = (new TrainerWorldGenerator()).generate(this.scheduler);
    } else {
        this.world = (new WorldGenerator()).generate(this.scheduler);
    }
  }

  getWorld():GameObject {
    return this.world;
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

  exportPlayerAgentBrain():any {
    return this.playerAgent.exportBrain();
  }
}
