

export default class Scheduler {

  constructor(executeCommand) {
    this.position = 0;
    this.agents = [];
    this.executeCommand = executeCommand;
  }

  add(agent) {
    this.agents.push(agent);
  }

  nextTurn() {
    if(!this.agents.length) {
      return;
    }

    this.agents[this.position++].takeTurn(this.executeCommand);
    if(this.position >= this.agents.length) {
      this.position = 0;
    }
  }

}
