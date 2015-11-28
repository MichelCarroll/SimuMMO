
import GameObject from '../GameObject';
import {Command} from '../Command';
import {Agent} from '../Agent';
import WaitCommand from '../Command/WaitCommand';
import {Action} from './Action';
import NeuralNetworkModel from './AI/NeuralNetworkModel';

export default class SmartAgent implements Agent {

  target:GameObject;
  turnsToWait:number;
  brain:NeuralNetworkModel;

  constructor(target:GameObject) {
    this.turnsToWait = 0;
    this.target = target;
    this.brain = new NeuralNetworkModel(this.getState().length, this.getPossibleActions().length);
  }

  getState():number[] {
    return [];
  }

  getPossibleActions():Action[] {
    return [];
  }

  fetchCommand(preState:number[]):any {
    let [q, action] = this.brain.getBestActionFromState(preState);
    let actionObj = this.getPossibleActions()[action];
    let command = actionObj.canExecute() ? actionObj.retrieveCommand() : new WaitCommand();
    return [command, action];
  }

  processTurn(executor:(cmd:Command)=>void):boolean {
    if(this.turnsToWait-- > 0) {
      executor(new WaitCommand());
      return false;
    }

    let preState = this.getState();
    let [command, actionNumber] = this.fetchCommand(preState);
    executor(command);
    let postState = this.getState();
    let reward = command.getReward();
    this.turnsToWait += command.getTurnCooldown();
    // console.log({'prestate': preState, 'reward': reward,'postState': postState});
    this.brain.addTrainingExample(preState, actionNumber, reward, postState);
    this.brain.update();
    return true;
  }

  takeTurn(commandCallback:(cmd:Command)=>void) {
    return 0;
  }

}
