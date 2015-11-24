
import MonsterGenerator from '../Generator/MonsterGenerator'

export default class SpawnMonsterCommand {

  constructor(spawner) {
    this.spawner = spawner;
  }

  execute() {
    let monster = (new MonsterGenerator()).generate();
    this.spawner.getContainer().beings.add(monster);
  }

  describe() {
    return `Spawner #${this.spawner.id} spawned a monster`;
  }
}
