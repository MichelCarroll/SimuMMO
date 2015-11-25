
import MonsterGenerator from '../Generator/MonsterGenerator'
import MonsterSpawn from '../MonsterSpawn';

export default class SpawnMonsterCommand {

  spawner:MonsterSpawn;

  constructor(spawner:MonsterSpawn) {
    this.spawner = spawner;
  }

  execute() {
    let monster = (new MonsterGenerator()).generate();
    this.spawner.getContainer().beings.add(monster);
  }

  describe() {
    return `Spawner #${this.spawner.id} spawned a monster`;
  }

  getTurnCooldown():number {
    return 4;
  }
}
