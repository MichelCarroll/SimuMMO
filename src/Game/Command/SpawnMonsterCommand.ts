
import GameObject from '../GameObject';
import MonsterGenerator from '../Generator/MonsterGenerator'

export default class SpawnMonsterCommand {

  spawner:GameObject;

  constructor(spawner:GameObject) {
    this.spawner = spawner;
  }

  execute() {
    let monster = (new MonsterGenerator()).generate();
    this.spawner.getParent().add(monster);
  }

  describe() {
    return `Spawner #${this.spawner.id} spawned a monster`;
  }

  getTurnCooldown():number {
    return 4;
  }

  getReward():number {
    return 0;
  }
}
