
import GameObject from '../../Common/GameObject';
import {Command} from '../Command';
import {Agent} from '../Agent';
import WaitCommand from '../Command/WaitCommand';
import WaitAction from './Action/WaitAction';
import {Action} from './Action';
import NeuralNetworkModel from './AI/NeuralNetworkModel';

export default class SmartAgent implements Agent {

  PERFORMANCE_MEMORY = 1000;

  cumulativePerformance:number[];
  target:GameObject;
  turnsToWait:number;
  lastScore:number;
  turnNumber:number;
  brain:NeuralNetworkModel;

  constructor(target:GameObject) {
    this.turnsToWait = 0;
    this.turnNumber = 0;
    this.lastScore = 0;
    this.cumulativePerformance = new Array(this.PERFORMANCE_MEMORY);
    this.target = target;
    this.brain = new NeuralNetworkModel(Object.keys(this.getState()).length, this.getPossibleActions().length);
  }

  exportBrain():any {
    return this.brain.export();
  }

  importBrain(data:any) {
    this.brain.import(data);
  }

  getState():Object {
    return {};
  }

  getPossibleActions():Action[] {
    return [];
  }

  stateToVector(state:Object):number[] {
    return Object.keys(state).map((key:string) => state[key]);
  }

  fetchCommand(preState:Object):any {
    let [q, actionNumber] = this.brain.getBestActionFromState(this.stateToVector(preState), true);
    let actionObj = this.getPossibleActions()[actionNumber];
    if(!actionObj.canExecute()) {
      let command = new WaitCommand();
      return [command, actionNumber, actionObj, (new WaitAction(this.target)).getReward()];
      // console.log(this.target.toString()+' attempted to '+actionObj.toString());
    }

    return [actionObj.retrieveCommand(), actionNumber, actionObj, actionObj.getReward()];
  }

  processTurn(executor:(cmd:Command)=>void):boolean {
    this.turnNumber++;

    if(this.turnsToWait-- > 0) {
      executor(new WaitCommand());
      return false;
    }

    let preState = this.getState();
    let [command, actionNumber, actionObj, reward] = this.fetchCommand(preState);
    executor(command);
    let postState = this.getState();
    this.turnsToWait += command.getTurnCooldown();
    this.brain.addTrainingExample(this.stateToVector(preState), actionNumber, reward, this.stateToVector(postState));

    console.log(JSON.stringify({
      'prestate': preState,
      'action': actionObj.toString(),
      'reward': reward,
      'poststate': postState
    },null,4))

    this.brain.update();
    this.evaluatePerformance();
    return true;
  }

  evaluatePerformance() {
    let currScore = this.getCurrentScore();
    this.cumulativePerformance.push(currScore - this.lastScore);
    this.cumulativePerformance.splice(0, 1);
    this.lastScore = currScore;
  }

  getCurrentScore():number {
    return 0;
  }

  getMovingAveragePerformance():number {
    return this.cumulativePerformance.reduce((tot:number, cur:number) => tot + cur) / this.PERFORMANCE_MEMORY;
  }

  takeTurn(commandCallback:(cmd:Command)=>void) {
    return 0;
  }

}
