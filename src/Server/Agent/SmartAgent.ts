
import GameObject from '../../Common/GameObject';
import {Command} from '../Command';
import {Agent} from '../Agent';
import WaitCommand from '../Command/WaitCommand';
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
    this.brain = new NeuralNetworkModel(this.getState().length, this.getPossibleActions().length);
  }

  exportBrain():any {
    return this.brain.export();
  }

  importBrain(data:any) {
    this.brain.import(data);
  }

  getState():number[] {
    return [];
  }

  getPossibleActions():Action[] {
    return [];
  }

  fetchCommand(preState:number[]):any {
    let [q, action] = this.brain.getBestActionFromState(preState, true);
    let actionObj = this.getPossibleActions()[action];
    let command = actionObj.canExecute() ? actionObj.retrieveCommand() : new WaitCommand();
    return [command, action];
  }

  processTurn(executor:(cmd:Command)=>void):boolean {
    this.turnNumber++;

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
    this.evaluatePerformance();
    return true;
  }

  evaluatePerformance() {
    let currScore = this.getCurrentScore();
    this.cumulativePerformance.push(currScore - this.lastScore);
    this.cumulativePerformance.splice(0, 1);
    this.lastScore = currScore;

    // console.log('Current Performance: '+this.getMovingAveragePerformance());
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
