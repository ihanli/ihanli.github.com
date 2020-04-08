define('components/player/laserBlast', ['pixi'], function (PIXI) {
  var VELOCITY = 15;
  function LaserBlast(app) {
    let texture = PIXI.Texture.from('/assets/images/laser.png');
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.45);
    this.sprite.anchor.set(0.5, 0.5);

    this.app = app;
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

  LaserBlast.prototype.move = function (delta) {
    this.sprite.position.y -= VELOCITY * delta;

    if (this.getPosition().y <= 0) {
      this.remove();
    }
  };

  LaserBlast.prototype.startMovement = function () {
    this.app.ticker.add(this.move, this);
  };

  LaserBlast.prototype.remove = function () {
    this.app.stage.removeChild(this.getSprite());
    this.app.ticker.remove(this.move, this);
  };

  return LaserBlast;
});
