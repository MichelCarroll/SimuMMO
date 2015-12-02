

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

  private createPlayer(town:GameObject) {
    let player = (new PlayerGenerator()).generate();
    town.add(player);
    let playerAgent = new PlayerAgent(player);
    playerAgent.importBrain(this.playerAgentData);
    this.scheduler.add(playerAgent);
  }

  private createSpawner(dungeon:GameObject) {
    let spawn = new GameObject(['spawn']);
    spawn.addComponent(new MonsterSpawn());
    dungeon.add(spawn);
    this.scheduler.add(new SpawnAgent(spawn));
  }

  generate(numPlayers:number, numSpawners:number):GameObject {
    let town = this.createLocation('town');
    let dungeon = this.createLocation('dungeon');

    let shopkeep = new GameObject(['shopkeep']);
    town.add(shopkeep);

    let world = new GameObject();
    world.add(dungeon);
    world.add(town);
    (<Referencer>town.getComponent('referencer')).add(dungeon);
    (<Referencer>dungeon.getComponent('referencer')).add(town);

    for(let x = 0; x < numSpawners; x++) {
      this.createSpawner(dungeon);
    }

    for(let x = 0; x < numPlayers; x++) {
      this.createPlayer(town);
    }

    return world;
  }

}
