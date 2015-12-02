
import {Component} from '../../Common/Component';
import {Event} from '../../Common/Event';

export default class MonsterSpawn implements Component {

  getName():string {
    return 'monster_spawn';
  }

  describe():Object {
      return {}
  }

  onEvent(event:Event) {

  }
}
