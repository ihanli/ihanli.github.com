define(
  'spaceShip',
  [
    'pixi',
    'spaceShip/healthBar',
    'spaceShip/weaponSystem'
  ],
  function (
    PIXI,
    HealthBar,
    WeaponSystem
  ) {
    return class SpaceShip extends PIXI.Container {
      constructor() {
        super();

        let texture = PIXI.Texture.from('/assets/images/ship.png');
        let sprite = new PIXI.Sprite(texture);
        let healthBar = new HealthBar();
        let weaponSystem = new WeaponSystem(this);

        sprite.scale.set(0.4);
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(0, -5);

        healthBar.position.set(0, 25);

        this.addChild(sprite, healthBar);

        document.addEventListener('player.hit', this.decreaseHealth.bind(this), false);
      };

      decreaseHealth(evt) {
        let self = this;
        let currentFrame = 0;
        let targetFrame = 10;
        let animate = function (delta) {
          if (currentFrame === targetFrame) {
            PIXI.ticker.shared.remove(animate);
            return;
          }

          self.children[1].decreaseHealth(evt.detail.damage / targetFrame);
          currentFrame++;
        };

        PIXI.ticker.shared.add(animate);
      };

      rotateBy(delta) {
        this.children[0].rotation = this.rotation + delta;
      };

      get rotation() {
        return this.children[0].rotation;
      }
    };
  }
);
