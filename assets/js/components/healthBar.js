define('components/healthBar', ['pixi'], function (PIXI) {
  function HealthBar() {
    let texture = PIXI.Texture.from('/assets/images/health.png');
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.2);
    this.sprite.anchor.set(0.5, 0.5);
  };

  HealthBar.prototype.setPosition = function (x, y) {
    this.sprite.position.set(x, y);
  };

  HealthBar.prototype.getSprite = function () {
    return this.sprite;
  };

  return HealthBar;
});
