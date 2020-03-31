define('components/enemy/asteroid', ['pixi'], function (PIXI) {
  function Asteroid() {
    let texture = PIXI.Texture.from('/assets/images/asteroid.png');
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.3);
    this.sprite.anchor.set(0.5, 0.5);
  };

  Asteroid.prototype.setPosition = function (x, y) {
    this.sprite.position.set(x, y);
  };

  Asteroid.prototype.getSprite = function () {
    return this.sprite;
  };

  return Asteroid;
});
