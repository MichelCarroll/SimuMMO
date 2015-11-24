
import CommandQueue from './CommandQueue';
import Scheduler from './Scheduler';
import WorldGenerator from './Generator/WorldGenerator';
import PlayerAgent from './Agent/PlayerAgent';
import SpawnAgent from './Agent/SpawnAgent';

export default class Game {

  constructor() {
    this.commandQueue = new CommandQueue();
    this.world = (new WorldGenerator()).generate();
    this.scheduler = new Scheduler(this.executeCommand.bind(this));
  }

  executeCommand(command) {
    this.commandQueue.queue(command);
    this.commandQueue.flush();
  }

  initiate() {
    this.scheduler.add(new PlayerAgent(
      this.world.locations.oneOfType('town').beings.oneOfType('player')
    ));
    this.scheduler.add(new SpawnAgent(
      this.world.locations.oneOfType('dungeon').immobiles.oneOfType('spawn')
    ));
  }

  run(numTurns) {
    for(let x = 0; x < numTurns; x++) {
        this.scheduler.nextTurn();
    }
  }

  debug() {
    console.log(require('util').inspect(this.world, true, 10))
  }
}
