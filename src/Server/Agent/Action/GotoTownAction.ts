
import GotoAction from './GotoAction';

export default class GotoTownAction extends GotoAction {

    getLocationName():string {
      return 'town';
    }

    toString():string {
      return 'Go to town';
    }

}
