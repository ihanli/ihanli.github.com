define('player', ['pixi'], function (PIXI) {
  function Player() {
    let spriteSheet = PIXI.Texture.from('/assets/images/sheet.png');

    spriteSheet.baseTexture.width = 1024;
    spriteSheet.baseTexture.height = 1024;
    spriteSheet.frame = new PIXI.Rectangle(143, 293, 103, 84);

    this.ship = new PIXI.Sprite(spriteSheet);
    this.ship.scale.set(0.4);
  };

  Player.prototype.addToStage = function (stage) {
    stage.addChild(this.ship);
  };

  return Player;
});
