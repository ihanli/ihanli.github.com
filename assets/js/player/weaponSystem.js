define('player/weaponSystem', ['pixi', 'components/player/laserBlast'], function (PIXI, LaserBlast) {
  function WeaponSystem(app, player) {
    this.app = app;
    this.player = player;
  };

  WeaponSystem.prototype.shoot = function () {
    let laser = new LaserBlast(this.app);

    laser.setPosition(
      this.player.getPosition().x,
      this.player.getPosition().y - this.player.getHeight()
    );

    this.app.stage.addChild(laser.getSprite());

    laser.startMovement();
  }

  return WeaponSystem;
});
