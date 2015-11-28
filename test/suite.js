

import Game from '../game/Game/Game.js'
const should = require("should");

describe('lol', function() {
  let game = null;

  beforeEach(function(done){
    game = new Game();
    game.run(100, done);
  });

  it('lol', function() {
    // game.debug();
    should(game.player.getComponent('inventory').money).be.above(0);
  });

});
