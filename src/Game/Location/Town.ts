
import Location from '../Location';

export default class Town extends Location {

  getObjectTypes() {
    return super.getObjectTypes().concat(['town']);
  }


}
