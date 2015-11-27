
import {Action} from '../Action'
import GameObject from '../../GameObject'
import {Command} from '../../Command';
import MoveCommand from '../../Command/MoveCommand';
import Referencer from '../../Components/Referencer';

export default class GotoTownAction implements Action {

  canExecute(target:GameObject):boolean {
    return !target.getParent().isA('town');
  }

  retrieveCommand(target:GameObject):Command {
    return new MoveCommand(
      target,
      (<Referencer>target.getParent().getComponent('referencer')).oneOfType('town')
    );
  }

}
