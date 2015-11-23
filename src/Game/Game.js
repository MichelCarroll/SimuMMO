
import CommandQueue from './CommandQueue';
import WorldGenerator from './Generator/WorldGenerator';
import Agent from './Agent';

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
    let agent = new Agent(player, this.executeCommand.bind(this));
    agent.takeTurn();
  }

}
