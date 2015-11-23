
import CommandQueue from './CommandQueue';
import WorldGenerator from './Generator/WorldGenerator';
import PlayerAgent from './Agent/PlayerAgent';
import SpawnAgent from './Agent/SpawnAgent';

export default class Game {

  constructor() {
    this.commandQueue = new CommandQueue();
    this.world = (new WorldGenerator()).generate();
  }

  executeCommand(command) {
    this.commandQueue.queue(command);
    this.commandQueue.flush();
  }

  start() {
    let player = this.world.locations.oneOfType('town').beings.oneOfType('player');
    let playerAgent = new PlayerAgent(this.executeCommand.bind(this), player);

    let spawner = this.world.locations.oneOfType('dungeon').immobiles.oneOfType('spawn');
    let spawnAgent = new SpawnAgent(this.executeCommand.bind(this), spawner);

    playerAgent.takeTurn();
    spawnAgent.takeTurn();

    console.log(require('util').inspect(this.world, true, 10))
  }

}
