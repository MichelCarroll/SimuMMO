

import Game from '../game/Game/Game.js'
const should = require("should");

describe('lol', function() {
  let game = null;

  beforeEach(function(){
    game = new Game();
  });

  it('lol', function() {
    game.run(100);
    // game.debug();
    should(game.player.getComponent('inventory').money).be.above(0);
  });

});
