define(
  'enemy',
  [
    'pixi',
    'components/enemy/asteroid',
    'components/enemy/healthBar',
    'components/animations/explosion',
    'vector2D'
  ],
  function (
    PIXI,
    Asteroid,
    HealthBar,
    Explosion,
    Vector2D
  ) {
    const VELOCITY = 5;
    const EVENTS = {
      'player.hit': new CustomEvent('player.hit', { detail: {} })
    };

    function Enemy(app) {
      this.app = app;
      this.travelDistance = 0;
      this.movement = new Vector2D(VELOCITY, 0);
      this.damage = 50;

      this.container = new PIXI.Container();
      this.container.position.set(0, 0);

      this.asteroid = new Asteroid();
      this.asteroid.setPosition(0, 0);

      this.explosion = new Explosion(this.app.ticker);
      this.explosion.setPosition(0, 0);

      this.healthBar = new HealthBar('shangalang');
      this.healthBar.setY(15);

      this.container.addChild(this.asteroid.getSprite());
      this.container.addChild(this.explosion.getSprite());
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
      this.app.ticker.add(this.animate, this);
    };

    Enemy.prototype.animate = function (delta) {
      this.asteroid.rotate(delta);
      this.move(delta);
    };

    Enemy.prototype.move = function (delta) {
      let offset = this.healthBar.getHeight() * 1.6;

      if (this.travelDistance === 0 || (this.container.position.y + offset) >= this.travelDistance) {
        return;
      } else if (this.container.position.y + this.movement.getY() + offset > this.travelDistance) {
        let evt = EVENTS['player.hit'];
        evt.detail.damage = this.damage;

        this.container.position.x += (this.travelDistance - this.container.position.y - offset) * this.movement.getTangent();
        this.container.position.y = this.travelDistance - offset;

        document.dispatchEvent(evt);

        this.destroy();
      } else {
        this.container.position.x += this.movement.getX() * delta;
        this.container.position.y += this.movement.getY() * delta;
      }
    };

    Enemy.prototype.destroy = function () {
      let self = this;

      this.container.removeChild(this.healthBar.getText());
      this.app.ticker.remove(this.animate, this);

      this.explosion.animate(function () {
        self.app.stage.removeChild(self.container);
      });
    };

    return Enemy;
  }
);
