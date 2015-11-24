
import Player from '../Being/Player';

export default class RestCommand {

  player:Player;

  constructor(player:Player) {
    this.player = player;
  }

  execute() {
    this.player.rest();
  }

  describe() {
    return `Player #${this.player.id} rested`;
  }

}
