

import Player from '../Being/Player'
import Monster from '../Being/Monster'
import Dungeon from '../Location/Dungeon'
import Town from '../Location/Town'
import World from '../World'

export default class WorldGenerator {

  generate() {
    let town = new Town();
    let player = new Player();
    player.setLocation(town);
    town.addBeing(player);

    let dungeon = new Dungeon();
    let monster = new Monster();
    monster.setLocation(dungeon);
    dungeon.addBeing(monster);

    let world = new World();
    world.addLocation(dungeon);
    world.addLocation(town);
    town.addAdjacentLocation(dungeon);
    dungeon.addAdjacentLocation(town);

    return world;
  }

}
