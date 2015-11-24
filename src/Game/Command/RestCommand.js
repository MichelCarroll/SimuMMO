


export default class RestCommand {

  constructor(player) {
    this.player = player;
  }

  execute() {
    this.player.rest();
  }

  describe() {
    return `Player #${this.player.id} rested`;
  }

}
