define(
  'enemy',
  [
    'pixi',
    'components/enemy/asteroid',
    'vector2D'
  ],
  function (
    PIXI,
    Asteroid,
    Vector2D
  ) {
    var VELOCITY = 5;
    var DEGREES_PER_ROTATION = 5;

    function Enemy(app) {
      this.app = app;
      this.travelDistance = 0;
      this.movement = new Vector2D(0, VELOCITY);

      this.container = new PIXI.Container();
      this.container.position.set(0, 0);

      this.asteroid = new Asteroid();
      this.asteroid.setPosition(0, 0);

      this.container.addChild(this.asteroid.getSprite());
      this.app.stage.addChild(this.container);
    };

    Enemy.prototype.setPosition = function (x, y) {
      this.container.position.set(x, y);
    };

    Enemy.prototype.getWidth = function () {
      return this.asteroid.getSprite().texture.baseTexture.width;
    };

    Enemy.prototype.getHeight = function () {
      return this.asteroid.getSprite().texture.baseTexture.height;
    };

    Enemy.prototype.setTravelDistance = function (travelDistance) {
      this.travelDistance = travelDistance;
    };

    Enemy.prototype.aimAt = function (target) {
      let localVector = new Vector2D(
        target.x - this.container.x,
        target.y - this.container.y
      );
      let angle = Math.asin(localVector.getX() / localVector.getLength());

      this.movement.setX(VELOCITY * Math.sin(angle));
      this.movement.setY(VELOCITY * Math.cos(angle));
    };

    Enemy.prototype.startMovement = function () {
      this.app.ticker.add((delta) => {
        this.rotate(delta);
        this.move(delta);
      });
    };

      if (this.travelDistance === 0) {
    Enemy.prototype.move = function (delta) {
        return
      } else if (this.container.position.y + this.movement.getY() > this.travelDistance) {
        this.container.position.y = this.travelDistance;
      } else {
        this.container.position.x += this.movement.getX() * delta;
        this.container.position.y += this.movement.getY() * delta;
      }
    };

    Enemy.prototype.rotate = function (delta) {
      this.container.rotation += PIXI.DEG_TO_RAD * DEGREES_PER_ROTATION * delta;
    };

    return Enemy;
  }
);
