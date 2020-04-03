define('components/player/healthBar', ['pixi'], function (PIXI) {
  const MAX_HEALTH = 269;

  function HealthBar() {
    let texture = PIXI.Texture.from('/assets/images/health.png');
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.25);
    sprite.anchor.set(0.5, 0.5);

    this.health = new PIXI.Graphics();
    this.health.scale.set(0.2);

    this.currentHealthValue = setHealth(this.health, MAX_HEALTH);

    this.container = new PIXI.Container();
    this.container.addChild(sprite);
    this.container.addChild(this.health);
  };

  function setHealth(health, value) {
    health.clear();
    health.beginFill(0x406271);
    health.drawRoundedRect(-133, -19.5, value, 39, 3);
    health.endFill();

    return value;
  }

  HealthBar.prototype.setPosition = function (x, y) {
    this.container.position.set(x, y);
  };

  HealthBar.prototype.getSprite = function () {
    return this.container;
  };

  HealthBar.prototype.decreaseHealth = function (damage) {
    this.currentHealthValue = setHealth(this.health, this.currentHealthValue - (MAX_HEALTH * damage / 100));
  };

  return HealthBar;
});
