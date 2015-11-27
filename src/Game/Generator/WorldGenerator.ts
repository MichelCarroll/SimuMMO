

import GameObject from '../GameObject';
import MonsterSpawn from '../Components/MonsterSpawn';
import Referencer from '../Components/Referencer';
import World from '../World'
import Scheduler from '../Scheduler';
import PlayerAgent from '../Agent/PlayerAgent';
import SpawnAgent from '../Agent/SpawnAgent';
import MonsterGenerator from './MonsterGenerator';
import PlayerGenerator from './PlayerGenerator';

export default class WorldGenerator {

  createLocation(type:string):GameObject {
    let location = new GameObject([type]);
    location.addComponent(new Referencer());
    return location;
  }

  generate(scheduler:Scheduler) {
    let town = this.createLocation('town');
    let player = (new PlayerGenerator()).generate();
    let shopkeep = new GameObject(['shopkeep']);
    town.add(player);
    town.add(shopkeep);
    scheduler.add(new PlayerAgent(player));


    let dungeon = this.createLocation('dungeon');
    let monster = (new MonsterGenerator()).generate();
    let spawn = new GameObject(['spawn']);
    spawn.addComponent(new MonsterSpawn());
    dungeon.add(monster);
    dungeon.add(spawn);
    scheduler.add(new SpawnAgent(spawn));

    let world = new World();
    world.add(dungeon);
    world.add(town);
    (<Referencer>town.getComponent('referencer')).add(dungeon);
    (<Referencer>dungeon.getComponent('referencer')).add(town);

    return world;
  }

}
