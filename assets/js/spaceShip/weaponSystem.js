define(
  'spaceShip/weaponSystem',
  [
    'pixi',
    'spaceShip/laserBlast',
    'utils/vector2D',
    'asteroid'
  ],
  function (
    PIXI,
    LaserBlast,
    Vector2D,
    Asteroid
  ) {
    class WeaponSystem {
      constructor(spaceShip) {
        this.currentTarget = undefined;
        this.spaceShip = spaceShip;

        document.onkeydown = this.engage.bind(this);
      };

      shoot() {
        let laser = new LaserBlast(
          this.spaceShip.position.x + this.spaceShip.height * Math.sin(this.spaceShip.rotation),
          this.spaceShip.position.y - this.spaceShip.height * Math.cos(this.spaceShip.rotation)
        );

        laser.rotation = this.spaceShip.rotation;

        this.spaceShip.parent.addChild(laser);

        laser.startMovement();
      };

      engage(event) {
        if (event.key.match(/^[a-z\.-]{1}$/) === null) {
          return true;
        } else if (this.currentTarget === undefined) {
          this.currentTarget = lockTarget(this.spaceShip.parent, event.key);

          if (this.currentTarget !== undefined) {
            let worldPosition = this.currentTarget.currentLetter.toGlobal(this.currentTarget.parent.position);
            let localVector = new PIXI.Point(
              worldPosition.x - this.spaceShip.position.x,
              worldPosition.y - this.spaceShip.position.y
            );

            this.spaceShip.rotation = Math.asin(localVector.x / Math.hypot(localVector.x, localVector.y));
          }
        }

        if ((this.currentTarget instanceof Asteroid) && this.currentTarget.currentLetter.text === event.key) {
          this.shoot();
        }
      };
    };

    function lockTarget(stage, needle) {
      let index = 0;

      for (var i = 0; i < stage.children.length; i++) {
        if ((stage.children[i] instanceof Asteroid) && stage.children[i].currentLetter.text === needle) {
          return stage.getChildAt(i);
        }
      }

      return undefined;
    }

    return WeaponSystem;
  }
);
