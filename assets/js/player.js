define('player', ['pixi'], function (PIXI) {
  function Player() {
    let spriteSheet = PIXI.Texture.from('/assets/images/sheet.png');

    spriteSheet.baseTexture.width = 1024;
    spriteSheet.baseTexture.height = 1024;
    spriteSheet.frame = new PIXI.Rectangle(146, 293, 99, 84);

    this.ship = new PIXI.Sprite(spriteSheet);
    this.ship.scale.set(0.4);
    this.ship.anchor.set(0.5, 0.5);
  };

  Player.prototype.addToStage = function (stage) {
    stage.addChild(this.ship);
  };

  Player.prototype.setPosition = function (x, y) {
    this.ship.x = x;
    this.ship.y = y;
  };

  Player.prototype.getWidth = function () {
    return this.ship.width;
  };

  Player.prototype.getHeight = function () {
    return this.ship.height;
  };

  Player.prototype.setRotation = function (radiant) {
    this.ship.rotation = radiant;
  };

  return Player;
});
