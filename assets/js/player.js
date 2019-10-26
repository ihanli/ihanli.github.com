define(
  'player',
  [
    'pixi',
    'components/spaceShip'
  ],
  function (
    PIXI,
    SpaceShip
  ) {
    function Player() {
      this.container = new PIXI.Container();

      this.spaceShip = new SpaceShip();
      this.spaceShip.setPosition(0, -5);


      this.container.addChild(this.spaceShip.getSprite());
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
