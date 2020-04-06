define('components/player/spaceShip', ['pixi'], function (PIXI) {
  function SpaceShip() {
    let texture = PIXI.Texture.from('/assets/images/ship.png');
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.4);
    this.sprite.anchor.set(0.5, 0.5);
  };

  SpaceShip.prototype.getSprite = function () {
    return this.sprite;
  };

  SpaceShip.prototype.setPosition = function (x, y) {
    this.sprite.position.set(x, y);
  };

  SpaceShip.prototype.getPosition = function () {
    return this.sprite.position;
  };

  return SpaceShip;
});
