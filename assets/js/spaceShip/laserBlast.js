define(
  'spaceShip/laserBlast',
  [
    'pixi'
  ],
  function (
    PIXI
  ) {
    const VELOCITY = 15;

    return class LaserBlast extends PIXI.Sprite {
      constructor(x, y) {
        super(PIXI.Texture.from('/assets/images/laser.png'));

        this.position.set(x, y);
        this.scale.set(0.45);
        this.anchor.set(0.5, 0.5);
      };

      move(delta) {
        this.position.y -= VELOCITY * Math.cos(this.rotation) * delta;
        this.position.x += VELOCITY * Math.sin(this.rotation) * delta;

        if (this.position.y <= 0) {
          PIXI.ticker.shared.remove(this.move, this);
          this.destroy();
        }
      };

      startMovement() {
        PIXI.ticker.shared.add(this.move, this);
      };

      static get VELOCITY() {
        return VELOCITY;
      };
    };
  }
);
