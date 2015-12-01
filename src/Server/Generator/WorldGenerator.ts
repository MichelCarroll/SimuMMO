

import GameObject from '../../Common/GameObject'
import MonsterSpawn from '../Components/MonsterSpawn';
import Referencer from '../Components/Referencer';
import Scheduler from '../Scheduler';
import PlayerAgent from '../Agent/PlayerAgent';
import SpawnAgent from '../Agent/SpawnAgent';
import MonsterGenerator from './MonsterGenerator';
import PlayerGenerator from './PlayerGenerator';

export default class WorldGenerator {

  private scheduler:Scheduler;
  private playerAgentData:any;

  constructor(scheduler:Scheduler, playerAgentData:any) {
    this.scheduler = scheduler;
    this.playerAgentData = playerAgentData;
  }

  private createLocation(type:string):GameObject {
    let location = new GameObject([type]);
    location.addComponent(new Referencer());
    return location;
  }

  generate():GameObject {
    let town = this.createLocation('town');
    let player = (new PlayerGenerator()).generate();
    let shopkeep = new GameObject(['shopkeep']);
    town.add(player);
    town.add(shopkeep);
    let playerAgent = new PlayerAgent(player);
    playerAgent.importBrain(this.playerAgentData);
    this.scheduler.add(playerAgent);

    let dungeon = this.createLocation('dungeon');
    let monster = (new MonsterGenerator()).generate();
    let spawn = new GameObject(['spawn']);
    spawn.addComponent(new MonsterSpawn());
    dungeon.add(monster);
    dungeon.add(spawn);
    this.scheduler.add(new SpawnAgent(spawn));

    let world = new GameObject();
    world.add(dungeon);
    world.add(town);
    (<Referencer>town.getComponent('referencer')).add(dungeon);
    (<Referencer>dungeon.getComponent('referencer')).add(town);

    return world;
  }

}
