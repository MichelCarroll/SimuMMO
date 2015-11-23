

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
    town.beings.add(player);

    let dungeon = new Dungeon();
    let monster = new Monster();
    monster.setLocation(dungeon);
    dungeon.beings.add(monster);

    let world = new World();
    world.locations.add(dungeon);
    world.locations.add(town);
    town.adjacentLocations.add(dungeon);
    dungeon.adjacentLocations.add(town);

    return world;
  }

}
