

import Being from '../Being';
import MonsterPit from '../Immobile/MonsterPit';
import Location from '../Location'
import World from '../World'
import Scheduler from '../Scheduler';
import PlayerAgent from '../Agent/PlayerAgent';
import SpawnAgent from '../Agent/SpawnAgent';
import MonsterGenerator from './MonsterGenerator';

export default class WorldGenerator {

  generate(scheduler:Scheduler) {
    let town = new Location(['town']);
    let player = new Being(['player']);
    let shopkeep = new Being(['shopkeep']);
    town.add(player);
    town.add(shopkeep);
    scheduler.add(new PlayerAgent(player));


    let dungeon = new Location(['dungeon']);
    let monster = (new MonsterGenerator()).generate();
    let spawn = new MonsterPit();
    dungeon.add(monster);
    dungeon.add(spawn);
    scheduler.add(new SpawnAgent(spawn));

    let world = new World();
    world.add(dungeon);
    world.add(town);
    town.adjacentLocations.add(dungeon);
    dungeon.adjacentLocations.add(town);

    return world;
  }

}
