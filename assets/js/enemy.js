define(
  'enemy',
  [
    'pixi',
    'components/enemy/asteroid',
    'components/enemy/healthBar',
    'vector2D'
  ],
  function (
    PIXI,
    Asteroid,
    HealthBar,
    Vector2D
  ) {
    const VELOCITY = 5;

    function Enemy(app) {
      this.app = app;
      this.travelDistance = 0;
      this.movement = new Vector2D(VELOCITY, 0);

      this.container = new PIXI.Container();
      this.container.position.set(0, 0);

      this.asteroid = new Asteroid();
      this.asteroid.setPosition(0, 0);

      this.healthBar = new HealthBar('shangalang');
      this.healthBar.setY(15);

      this.container.addChild(this.asteroid.getSprite());
      this.container.addChild(this.healthBar.getText());
      this.app.stage.addChild(this.container);
    };

    Enemy.prototype.setPosition = function (x, y) {
      this.container.position.set(x, y);
    };

    Enemy.prototype.getWidth = function () {
      return this.healthBar.getWidth();
    };

    Enemy.prototype.setTravelDistance = function (travelDistance) {
      this.travelDistance = travelDistance;
    };

    Enemy.prototype.aimAt = function (target) {
      let localVector = Vector2D.createFromCartesian(
        target.x - this.container.x,
        target.y - this.container.y
      );

      this.movement.setAngle(localVector.getAngle());
    };

    Enemy.prototype.startMovement = function () {
      this.app.ticker.add((delta) => {
        this.asteroid.rotate(delta);
        this.move(delta);
      });
    };

    Enemy.prototype.move = function (delta) {
      let offset = this.healthBar.getHeight() * 1.6;

      if (this.travelDistance === 0 || (this.container.position.y + offset) >= this.travelDistance) {
        return;
      } else if (this.container.position.y + this.movement.getY() + offset > this.travelDistance) {
        this.container.position.x += (this.travelDistance - this.container.position.y - offset) * this.movement.getTangent();
        this.container.position.y = this.travelDistance - offset;
      } else {
        this.container.position.x += this.movement.getX() * delta;
        this.container.position.y += this.movement.getY() * delta;
      }
    };

    return Enemy;
  }
);
