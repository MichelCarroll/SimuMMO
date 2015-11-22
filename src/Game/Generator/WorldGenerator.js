

import Player from '../Being/Player'
import Monster from '../Being/Monster'
import Dungeon from '../Location/Dungeon'
import Town from '../Location/Town'
import World from '../World'

export default class WorldGenerator {

  generate() {
    let town = new Town();
    let player = new Player();
    let dungeon = new Dungeon();
    let monster = new Monster();
    let world = new World();

    world.addLocation(dungeon);
    world.addLocation(town);
    world.moveBeing(player, town);
    world.moveBeing(monster, dungeon);
    
    return world;
  }

}
