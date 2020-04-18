define(
  'spaceShip/laserBlast',
  [
    'pixi',
    'asteroid'
  ],
  function (
    PIXI,
    Asteroid
  ) {
    const VELOCITY = 15;
    const EVENTS = {
      'asteroid.hit': new CustomEvent('asteroid.hit', { detail: {} })
    };

    class LaserBlast extends PIXI.Sprite {
      constructor(x, y) {
        super(PIXI.Texture.from('/assets/images/laser.png'));

        this.position.set(x, y);
        this.scale.set(0.45);
        this.anchor.set(0.5, 0.5);
      };

      move(delta) {
        let hitDetected = false;

        this.position.y -= VELOCITY * Math.cos(this.rotation) * delta;
        this.position.x += VELOCITY * Math.sin(this.rotation) * delta;

        for (var i = 0; i < this.parent.children.length; i++) {
          if (!(this.parent.children[i] instanceof Asteroid)) {
            continue;
          } else {
            hitDetected = hitTest(this.getBounds(), this.parent.children[i].currentLetter.getBounds());
          }

          if (hitDetected) {
            break;
          }
        }

        if (this.position.y <= 0) {
          this.destroy();
        } else if (hitDetected) {
          this.destroy();
          document.dispatchEvent(EVENTS['asteroid.hit']);
        }
      };

      startMovement() {
        PIXI.ticker.shared.add(this.move, this);
      };

      destroy() {
        PIXI.ticker.shared.remove(this.move, this);
        super.destroy();
      };

      static get VELOCITY() {
        return VELOCITY;
      };
    };

    function hitTest(localBounds, objectBounds) {
      let hit = false;
      let combinedHalfWidths = localBounds.width / 2 + objectBounds.width / 2;
      let combinedHalfHeights = localBounds.height / 2 + objectBounds.height / 2;
      let dx = Math.abs(localBounds.x - objectBounds.x);
      let dy = Math.abs(localBounds.y - objectBounds.y);

      return dx < combinedHalfWidths && dy < combinedHalfHeights;
    };

    return LaserBlast;
  }
);
