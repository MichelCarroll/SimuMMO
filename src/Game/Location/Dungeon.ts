
import Location from '../Location';

export default class Dungeon extends Location{

  getObjectTypes() {
    return super.getObjectTypes().concat(['dungeon']);
  }

}
