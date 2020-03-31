define(
  'player',
  [
    'pixi',
    'components/player/healthBar',
    'components/player/spaceShip',
    'components/player/laserBlast'
  ],
  function (
    PIXI,
    HealthBar,
    SpaceShip,
    LaserBlast
  ) {
    function Player(stage) {
      this.stage = stage;
      this.container = new PIXI.Container();

      this.spaceShip = new SpaceShip();
      this.spaceShip.setPosition(0, -5);

      this.healthBar = new HealthBar();
      this.healthBar.setPosition(0, 25);

      this.container.addChild(this.spaceShip.getSprite());
      this.container.addChild(this.healthBar.getSprite());

      this.stage.addChild(this.container);
    };

    Player.prototype.setPosition = function (x, y) {
      this.container.position.set(x, y);
    };

    Player.prototype.setRotation = function (radiant) {
      this.container.rotation = radiant;
    };

    Player.prototype.getWidth = function () {
      return this.container.width;
    };

    Player.prototype.getHeight = function () {
      return this.container.height;
    };

    Player.prototype.shoot = function () {
      let laser = new LaserBlast();

      laser.setPosition(
        this.container.position.x,
        this.container.position.y - this.container.height
      );

      this.stage.addChild(laser.getSprite());

      return laser;
    };

    return Player;
  }
);
