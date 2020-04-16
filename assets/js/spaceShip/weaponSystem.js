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
          this.spaceShip.position.x + this.spaceShip.height / 2 * Math.sin(this.spaceShip.rotation),
          this.spaceShip.position.y - this.spaceShip.height / 2 * Math.cos(this.spaceShip.rotation)
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
        }

        if ((this.currentTarget instanceof Asteroid) && this.currentTarget.currentLetter.text === event.key) {
          let worldPosition = this.currentTarget.currentLetter.toGlobal(this.currentTarget.parent.position);
          let localVector = this.currentTarget.currentLetter.toLocal(this.currentTarget.parent.position, this.spaceShip);
          let deltaTime = aimAhead(
            Math.hypot(localVector.x, localVector.y),
            LaserBlast.VELOCITY,
            Asteroid.VELOCITY,
            Math.acos((localVector.x * this.currentTarget.trajectory.x + localVector.y * this.currentTarget.trajectory.y) / (Math.hypot(localVector.x, localVector.y) * Math.hypot(this.currentTarget.trajectory.x, this.currentTarget.trajectory.y)))
          );
          let meetingPoint = new PIXI.Point(
            worldPosition.x + this.currentTarget.trajectory.x * deltaTime - this.spaceShip.position.x,
            worldPosition.y + this.currentTarget.trajectory.y * deltaTime - this.spaceShip.position.y
          );

          this.spaceShip.rotation = Math.asin(meetingPoint.x / Math.hypot(meetingPoint.x, meetingPoint.y));

          this.shoot();
        }
      };
    };

    function aimAhead(distance, laserSpeed, targetSpeed, angle) {
      let distanceSquared = distance * distance;
      let laserSpeedSquared = laserSpeed * laserSpeed;
      let targetSpeedSquared = targetSpeed * targetSpeed;
      let distanceLaserSpeedSquared = distanceSquared * laserSpeedSquared;
      let distanceTargetSpeedSquared = distanceSquared * targetSpeedSquared;
      let sqrt = Math.sqrt(2 * distanceLaserSpeedSquared + distanceTargetSpeedSquared * (Math.cos(2 * angle) - 1));
      let dividend = Math.SQRT2 * sqrt - 2 * distance * targetSpeed * Math.cos(angle);
      let divisor = 2 * (laserSpeedSquared - targetSpeedSquared);

      return dividend / divisor;
    };

    function lockTarget(stage, needle) {
      let index = 0;

      for (var i = 0; i < stage.children.length; i++) {
        if ((stage.children[i] instanceof Asteroid) && stage.children[i].currentLetter.text === needle) {
          return stage.getChildAt(i);
        }
      }

      return undefined;
    };

    return WeaponSystem;
  }
);
