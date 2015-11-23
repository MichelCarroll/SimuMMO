
import MonsterSpawn from '../MonsterSpawn';

export default class MonsterPit extends MonsterSpawn {

  getObjectTypes() {
    return super.getObjectTypes().concat(['spawn']);
  }

}
