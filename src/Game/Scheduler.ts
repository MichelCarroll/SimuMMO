
import {Agent} from './Agent';
import {Command} from './Command';

export default class Scheduler {

  position:number;
  agents:Agent[];
  executeCommand:(cmd:Command)=>void;

  constructor(executeCommand:(cmd:Command)=>void) {
    this.position = 0;
    this.agents = [];
    this.executeCommand = executeCommand;
  }

  add(agent:Agent) {
    if(!this.agents.length || this.position === 0) {
      this.agents.push(agent);
    }
    else {
      this.agents.splice(this.position, 0, agent);
    }
  }

  nextTurn():boolean {
    if(!this.agents.length) {
      return false;
    }

    let agent = this.agents[this.position++];
    if(this.position >= this.agents.length) {
      this.position = 0;
    }

    return agent.processTurn(this.executeCommand);
  }

}
