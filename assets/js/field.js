define(
  'field',
  [
    'pixi',
    'player',
    'enemyBase'
  ],
  function (
    PIXI,
    Player,
    EnemyBase
  ) {
    const BORDER_WIDTH = 5;
    const HOME_BASE_HEIGHT = 70;

    function Field(container) {
        this.app = new PIXI.Application({
            width: window.innerWidth / 9 * 3,
            height: window.innerHeight - (2 * BORDER_WIDTH),
            transparent: true
        });

        let topLastLineOfDefense = this.app._options.height - HOME_BASE_HEIGHT;

        this.lastLineOfDefense = new PIXI.Graphics()
            .lineStyle(2, 0xffffff)
            .moveTo(0, topLastLineOfDefense)
            .lineTo(this.app._options.width, topLastLineOfDefense)

        this.player = new Player(this.app.stage);

        this.player.setPosition(
          this.app._options.width / 2,
          topLastLineOfDefense + HOME_BASE_HEIGHT / 2
        );

        this.enemyBase = new EnemyBase(this.app, topLastLineOfDefense, this.player.getPosition());

        container.prepend(this.app.view);
        this.app.stage.addChild(this.lastLineOfDefense);

        this.laserBlasts = [];

        document.onkeydown = this.onKeydownHandler.bind(this);

        this.app.ticker.add((delta) => {
            for (var i = 0; i < this.laserBlasts.length; i++) {
              let laserBlast = this.laserBlasts[i];

              laserBlast.move();

              if ((laserBlast.getPosition().y + laserBlast.getSprite().height / 2) <= 0) {
                this.app.stage.removeChild(laserBlast.getSprite());
                this.laserBlasts.shift();
              }
            }
        });
    };

    Field.prototype.onKeydownHandler = function (event) {
        if (event.key.match(/^[a-z\.-]{1}$/)) {
          this.laserBlasts.push(this.player.shoot());
        }
    };

    return Field;
});
