
import TrainerWorldGenerator from './Generator/TrainerWorldGenerator';
import WorldGenerator from './Generator/WorldGenerator';
import GameObject from '../Common/GameObject';
import Game from './Game';

export default class WorldGame extends Game {

  world:GameObject;

  constructor(playerAgentData:any) {
    super();
    let generator = new WorldGenerator(this.scheduler, playerAgentData);
    this.world = generator.generate();
  }

  getWorld():GameObject {
    return this.world;
  }
}
