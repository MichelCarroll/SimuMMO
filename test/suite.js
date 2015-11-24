

import Game from '../game/Game/Game.js'
const should = require("should");

describe('lol', function() {
  let game = null;

  beforeEach(function(){
    game = new Game();
    game.initiate();
  });

  it('lol', function() {
    game.run(10);
    let player = game.world.locations.oneOfType('town').beings.oneOfType('player');
    should(player.money).be.eql(5);
  });

});
