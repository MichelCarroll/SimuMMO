
import GotoAction from './GotoAction';

export default class GotoDungeonAction extends GotoAction {

    getLocationName():string {
      return 'dungeon';
    }

    toString():string {
      return 'Go to the dungeon';
    }

}
