define(
  'spaceShip/weaponSystem',
  [
    'pixi',
    'spaceShip/laserBlast',
    'utils/vector2D'
  ],
  function (
    PIXI,
    LaserBlast,
    Vector2D
  ) {
    return class WeaponSystem {
      constructor(spaceShip) {
        this.spaceShip = spaceShip;

        document.onkeydown = this.engage.bind(this);
      };

      shoot() {
        let laser = new LaserBlast(this.spaceShip.position.x, this.spaceShip.position.y - this.spaceShip.height);

        this.spaceShip.parent.addChild(laser);

        laser.startMovement();
      };

      engage(event) {
        this.shoot();
      };
    };
  }
);
