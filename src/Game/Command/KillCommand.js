


export default class KillCommand {

  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
  }

  execute() {
    this.player.injure();
    this.player.giveMoney(this.monster.getRewardMoney());
    this.monster.getContainer().beings.remove(this.monster);
  }

  describe() {
    return `Player #${this.player.id} killed Monster #${this.monster.id}`;
  }

}
