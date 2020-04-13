define(
  'asteroid',
  [
    'pixi',
    'asteroid/healthBar',
    'utils/vector2D',
    'animations/explosion'
  ],
  function (
    PIXI,
    HealthBar,
    Vector2D,
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

        this.movement = new Vector2D(VELOCITY, 0);
        this.travelDistance = 0;
        this.damage = 50;

        let texture = PIXI.Texture.from('/assets/images/asteroid.png');
        let sprite = new PIXI.Sprite(texture);
        let healthBar = new HealthBar('shangalang');

        sprite.scale.set(0.3);
        sprite.anchor.set(0.5, 0.5);

        healthBar.position.y = 25;

        this.addChild(sprite, new Explosion(), healthBar);
      };

      rotate(delta) {
        this.children[0].rotation += PIXI.DEG_TO_RAD * DEGREES_PER_ROTATION * delta;
      };

      move(delta) {
        let offset = this.children[2].height * 1.6;

        if (this.travelDistance === 0 || (this.position.y + offset) >= this.travelDistance) {
          return;
        } else if (this.position.y + this.movement.getY() + offset > this.travelDistance) {
          let evt = EVENTS['player.hit'];
          evt.detail.damage = this.damage;

          this.position.x += (this.travelDistance - this.position.y - offset) * this.movement.getTangent();
          this.position.y = this.travelDistance - offset;

          document.dispatchEvent(evt);

          this.blowUp();
        } else {
          this.position.x += this.movement.getX() * delta;
          this.position.y += this.movement.getY() * delta;
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
        let localVector = Vector2D.createFromCartesian(
          target.x - this.x,
          target.y - this.y
        );

        this.movement.setAngle(localVector.getAngle());
      };

      get currentLetter() {
        return this.children[2].currentLetter;
      };
    };
  }
);
