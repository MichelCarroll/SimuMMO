
import TrainerWorldGenerator from './Generator/TrainerWorldGenerator';
import WorldGenerator from './Generator/WorldGenerator';
import GameObject from '../Common/GameObject';
import Game from './Game';

export default class WorldGame extends Game {

  world:GameObject;

  constructor() {
    super();
    this.world = (new WorldGenerator()).generate(this.scheduler);
  }

  getWorld():GameObject {
    return this.world;
  }
}
