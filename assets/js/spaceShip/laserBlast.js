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
        this.movement = new PIXI.Point(0, VELOCITY);
      };

      move(delta) {
        this.position.y -= this.movement.y;
        this.position.x -= this.movement.x;

        if (this.position.y <= 0) {
          PIXI.ticker.shared.remove(this.move, this);
          this.destroy();
        }
      };

      startMovement() {
        PIXI.ticker.shared.add(this.move, this);
      };

      set rotation(value) {
        this.movement.x = this.movement.x * Math.cos(value) - this.movement.y * Math.sin(value);
        this.movement.y = this.movement.x * Math.sin(value) + this.movement.y * Math.cos(value);

        super.rotation = value;
      };
    };
  }
);
