

import Player from '../Being/Player'
import Monster from '../Being/Monster'
import MonsterPit from '../Immobile/MonsterPit';
import Dungeon from '../Location/Dungeon'
import Town from '../Location/Town'
import World from '../World'

export default class WorldGenerator {

  generate() {
    let town = new Town();
    let player = new Player();
    town.beings.add(player);

    let dungeon = new Dungeon();
    let monster = new Monster();
    let spawn = new MonsterPit();
    dungeon.beings.add(monster);
    dungeon.immobiles.add(spawn);

    let world = new World();
    world.locations.add(dungeon);
    world.locations.add(town);
    town.adjacentLocations.add(dungeon);
    dungeon.adjacentLocations.add(town);

    return world;
  }

}
