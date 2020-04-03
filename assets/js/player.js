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
    function Player(app) {
      this.app = app;
      this.container = new PIXI.Container();

      this.spaceShip = new SpaceShip();
      this.spaceShip.setPosition(0, -5);

      this.healthBar = new HealthBar();
      this.healthBar.setPosition(0, 25);

      this.container.addChild(this.spaceShip.getSprite());
      this.container.addChild(this.healthBar.getSprite());

      this.app.stage.addChild(this.container);

      document.addEventListener('player.hit', this.decreaseHealth.bind(this), false);
    };

    Player.prototype.setPosition = function (x, y) {
      this.container.position.set(x, y);
    };

    Player.prototype.getPosition = function () {
      return this.container.position;
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
        this.container.position.y - this.getHeight()
      );

      this.app.stage.addChild(laser.getSprite());

      return laser;
    };

    Player.prototype.decreaseHealth = function (evt) {
      let self = this;
      let currentFrame = 0;
      let targetFrame = 10;
      let animate = function (delta) {
        if (currentFrame === targetFrame) {
          self.app.ticker.remove(animate);
          return;
        }

        self.healthBar.decreaseHealth(evt.detail.damage / targetFrame);
        currentFrame++;
      };

      this.app.ticker.add(animate);
    };

    return Player;
  }
);
