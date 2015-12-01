
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import MoveCommand from '../../Command/MoveCommand';
import Referencer from '../../Components/Referencer';

export default class GotoAction implements Action {

  target:GameObject;

  constructor(target:GameObject) {
    this.target = target;
  }

  getLocationName():string {
    return 'unknown';
  }

  getLocation() {
    return (<Referencer>this.target.getParent().getComponent('referencer')).oneOfType(this.getLocationName());
  }

  canExecute():boolean {
    return !this.target.getParent().isA(this.getLocationName()) && this.getLocation();
  }

  retrieveCommand():Command {
    return new MoveCommand(
      this.target,
      (<Referencer>this.target.getParent().getComponent('referencer')).oneOfType(this.getLocationName())
    );
  }

}
