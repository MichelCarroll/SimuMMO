

import Player from '../Being/Player'
import Monster from '../Being/Monster'
import MonsterPit from '../Immobile/MonsterPit';
import Dungeon from '../Location/Dungeon'
import Town from '../Location/Town'
import World from '../World'
import Scheduler from '../Scheduler';
import PlayerAgent from '../Agent/PlayerAgent';
import SpawnAgent from '../Agent/SpawnAgent';

export default class WorldGenerator {

  generate(scheduler:Scheduler) {
    let town = new Town();
    let player = new Player();
    town.contents.add(player);
    scheduler.add(new PlayerAgent(player));

    let dungeon = new Dungeon();
    let monster = new Monster();
    let spawn = new MonsterPit();
    dungeon.contents.add(monster);
    dungeon.contents.add(spawn);
    scheduler.add(new SpawnAgent(spawn));

    let world = new World();
    world.locations.add(dungeon);
    world.locations.add(town);
    town.adjacentLocations.add(dungeon);
    dungeon.adjacentLocations.add(town);

    return world;
  }

}
