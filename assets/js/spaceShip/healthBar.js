define(
  'spaceShip/healthBar',
  [
    'pixi'
  ],
  function (
    PIXI
  ) {
    const MAX_HEALTH = 236;

    class HealthBar extends PIXI.Sprite {
      constructor() {
        super(PIXI.Texture.from('/assets/images/health.png'));

        this.scale.set(0.25);
        this.anchor.set(0.5, 0.5);

        let health = new PIXI.Graphics();

        health.scale.set(0.9);

        this.addChild(health);

        this.currentHealthValue = setHealth(health, MAX_HEALTH);
      };

      decreaseHealth(damage) {
        this.currentHealthValue = setHealth(this.children[0], this.currentHealthValue - (MAX_HEALTH * damage / 100));
      };
    };

    function setHealth(health, value) {
      health.clear();
      health.beginFill(0x406271);
      health.drawRoundedRect(-118, -16, value, 32, 1);
      health.endFill();

      return value;
    }

    return HealthBar;
  }
);
