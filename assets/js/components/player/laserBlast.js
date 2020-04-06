define('components/player/laserBlast', ['pixi'], function (PIXI) {
  var VELOCITY = 15;
  function LaserBlast() {
    let texture = PIXI.Texture.from('/assets/images/laser.png');
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.45);
    this.sprite.anchor.set(0.5, 0.5);
  };

  LaserBlast.prototype.setPosition = function (x, y) {
    this.sprite.position.set(x, y);
  };

  LaserBlast.prototype.getPosition = function () {
    return this.sprite.position;
  };

  LaserBlast.prototype.getSprite = function () {
    return this.sprite;
  };

  LaserBlast.prototype.move = function () {
    this.sprite.position.y -= VELOCITY;
  };

  return LaserBlast;
});
