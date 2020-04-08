define('components/animations/explosion', ['pixi'], function (PIXI) {
  const TARGET_SCALE = 0.9;
  const SCALE_INCREASE_RATE = 0.3;
  const SCALE_DECREASE_RATE = 0.45;

  function Explosion(ticker) {
    let texture = PIXI.Texture.from('/assets/images/explosion.png');
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0);
    this.sprite.anchor.set(0.5, 0.5);

    this.ticker = ticker;
  };

  Explosion.prototype.setPosition = function (x, y) {
    this.sprite.position.set(x, y);
  };

  Explosion.prototype.getSprite = function () {
    return this.sprite;
  };

  Explosion.prototype.animate = function (callback) {
    let self = this;

    this.expand(function () {
      self.collapse(callback);
    });
  };

  Explosion.prototype.expand = function (callback) {
    let self = this;
    let animate = function () {
      if (self.sprite.scale.x >= TARGET_SCALE) {
        self.ticker.remove(animate);

        if (typeof callback === 'function') {
          callback();
        }

        return;
      }

      self.sprite.scale.set(self.sprite.scale.x + SCALE_INCREASE_RATE);
    };

    this.ticker.add(animate);
  };

  Explosion.prototype.collapse = function (callback) {
    let self = this;
    let animate = function () {
      if (self.sprite.scale.x <= 0) {
        self.ticker.remove(animate);

        if (typeof callback === 'function') {
          callback();
        }

        return;
      }

      self.sprite.scale.set(self.sprite.scale.x - SCALE_DECREASE_RATE);
    };

    this.ticker.add(animate);
  };

  return Explosion;
});
