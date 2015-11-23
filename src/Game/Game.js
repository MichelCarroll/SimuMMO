
import CommandQueue from './CommandQueue';
import WorldGenerator from './Generator/WorldGenerator';
import Agent from './Agent';

export default class Game {

  constructor() {
    this.commandQueue = new CommandQueue();
    this.world = (new WorldGenerator()).generate();
  }

  executeCommand(command) {
    this.commandQueue.push(command);
    this.commandQueue.flush();
  }

  start() {
    let town = this.world.getLocations().find((location) => location.getObjectType() == 'town');
    let player = town.getBeings().find((location) => location.getObjectType() == 'player');
    let agent = new Agent(player, this.executeCommand.bind(this));
    agent.takeTurn();
  }

}
