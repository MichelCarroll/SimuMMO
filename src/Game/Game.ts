
import CommandQueue from './CommandQueue';
import Scheduler from './Scheduler';
import WorldGenerator from './Generator/WorldGenerator';
import PlayerAgent from './Agent/PlayerAgent';
import SpawnAgent from './Agent/SpawnAgent';
import World from './World';
import {Command} from './Command';
import Player from './Being/Player';

export default class Game {

  commandQueue:CommandQueue;
  world:World;
  scheduler:Scheduler;
  player:Player;

  constructor() {
    this.commandQueue = new CommandQueue();
    this.world = (new WorldGenerator()).generate();CommandQueue;
    this.scheduler = new Scheduler(this.executeCommand.bind(this));

    this.player = this.world.locations.oneOfType('town').beings.oneOfType('player');
  }

  executeCommand(command:Command) {
    this.commandQueue.queue(command);
    this.commandQueue.flush();
  }

  initiate() {
    this.scheduler.add(new PlayerAgent(this.player));
    this.scheduler.add(new SpawnAgent(
      this.world.locations.oneOfType('dungeon').immobiles.oneOfType('spawn')
    ));
  }

  run(numTurns:number) {
    let tries = 0;
    let turns = 0;

    while(tries++ < 10 && turns < numTurns) {
        if(this.scheduler.nextTurn()) {
          turns++;
          tries = 0;
        } else {
          tries++;
        }
    }
  }

  debug() {
    // console.log(require('util').inspect(this.world, true, 10))
    this.commandQueue.debug();
  }
}
