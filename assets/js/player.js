define(
  'player',
  [
    'pixi',
    'components/healthBar',
    'components/spaceShip'
  ],
  function (
    PIXI,
    HealthBar,
    SpaceShip
  ) {
    function Player() {
      this.container = new PIXI.Container();

      this.spaceShip = new SpaceShip();
      this.spaceShip.setPosition(0, -5);

      this.healthBar = new HealthBar();
      this.healthBar.setPosition(0, 25);

      this.container.addChild(this.spaceShip.getSprite());
      this.container.addChild(this.healthBar.getSprite());
    };

    Player.prototype.addToStage = function (stage) {
      stage.addChild(this.container);
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

    return Player;
  }
);
