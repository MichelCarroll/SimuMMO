
import GameObject from './GameObject';
import {Command} from './Command';
import WaitCommand from './Command/WaitCommand';
import {Action} from './Agent/Action';
import NeuralNetworkModel from './Agent/AI/NeuralNetworkModel';

export default class Agent {

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

  fetchCommand(preState:number[], callback:(cmd:Command, action:number)=>void) {
    this.brain.getBestActionFromState(preState, (q:number, action:number) => {
      let actionObj = this.getPossibleActions()[action];
      let command = actionObj.canExecute() ? actionObj.retrieveCommand() : new WaitCommand();
      callback(command, action);
    });
  }

  processTurn(executor:(cmd:Command)=>void, onDone:()=>void) {
    if(this.turnsToWait-- > 0) {
      executor(new WaitCommand());
      return;
    }

    let preState = this.getState();
    this.fetchCommand(preState, (command:Command, actionNumber:number) => {
      executor(command);
      let postState = this.getState();
      let reward = command.getReward();
      this.turnsToWait += command.getTurnCooldown();
      // console.log({'prestate': preState, 'reward': reward,'postState': postState});
      this.brain.addTrainingExample(preState, actionNumber, reward, postState);
      this.brain.update(onDone);
    });
  }

  takeTurn(commandCallback:(cmd:Command)=>void) {
    return 0;
  }

}
