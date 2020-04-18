define(
  'asteroid',
  [
    'pixi',
    'asteroid/healthBar',
    'animations/explosion'
  ],
  function (
    PIXI,
    HealthBar,
    Explosion
  ) {
    const DEGREES_PER_ROTATION = 5;
    const VELOCITY = 5;
    const EVENTS = {
      'player.hit': new CustomEvent('player.hit', { detail: {} })
    };

    return class Asteroid extends PIXI.Container {
      constructor() {
        super();

        this.trajectory = new PIXI.Point(VELOCITY, 0);
        this.travelDistance = 0;
        this.damage = 50;

        let texture = PIXI.Texture.from('/assets/images/asteroid.png');
        let sprite = new PIXI.Sprite(texture);
        let healthBar = new HealthBar('shangalang');

        sprite.scale.set(0.3);
        sprite.anchor.set(0.5, 0.5);

        healthBar.position.y = 25;

        this.addChild(sprite, new Explosion(), healthBar);

        document.addEventListener('asteroid.hit', this.decreaseHealth.bind(this), false);
      };

      decreaseHealth(evt) {
        this.children[2].decreaseHealth();
      };

      rotate(delta) {
        this.children[0].rotation += PIXI.DEG_TO_RAD * DEGREES_PER_ROTATION * delta;
      };

      move(delta) {
        let offset = this.children[2].height * 1.6;

        if (this.travelDistance === 0 || (this.position.y + offset) >= this.travelDistance) {
          return;
        } else if (this.position.y + this.trajectory.y + offset > this.travelDistance) {
          let trajectoryAngle = Math.asin(this.trajectory.x / Math.hypot(this.trajectory.x, this.trajectory.y));
          let evt = EVENTS['player.hit'];
          evt.detail.damage = this.damage;

          this.position.x += (this.travelDistance - this.position.y - offset) * Math.tan(trajectoryAngle);
          this.position.y = this.travelDistance - offset;

          document.dispatchEvent(evt);

          this.blowUp();
        } else {
          this.position.x += this.trajectory.x * delta;
          this.position.y += this.trajectory.y * delta;
        }
      };

      animate(delta) {
        this.rotate(delta);
        this.move(delta);
      };

      startMovement() {
        PIXI.ticker.shared.add(this.animate, this);
      };

      blowUp() {
        this.children[2].destroy();

        PIXI.ticker.shared.remove(this.animate, this);

        this.children[1].animate(
          function (context) {
            context.parent.children[0].destroy();
          },
          function (context) {
            context.parent.destroy();
          }
        );
      };

      aimAt(target) {
        this.trajectory.x = target.x - this.x;
        this.trajectory.y = target.y - this.y;

        // The trajectory actually points directly to the target now. Calculate a factor so the vector can be normalized.
        let normFactor = VELOCITY / Math.hypot(this.trajectory.x, this.trajectory.y);

        this.trajectory.x *= normFactor;
        this.trajectory.y *= normFactor;
      };

      get currentLetter() {
        return this.children[2].currentLetter;
      };

      static get VELOCITY() {
        return VELOCITY;
      };
    };
  }
);
