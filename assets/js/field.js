define(
  'field',
  [
    'pixi',
    'player',
    'enemy/base'
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

        this.player = new Player(this.app);

        this.player.setPosition(
          this.app._options.width / 2,
          topLastLineOfDefense + HOME_BASE_HEIGHT / 2
        );

        this.enemyBase = new EnemyBase(this.app, topLastLineOfDefense, this.player.getPosition());
        this.app.stage.addChild(this.lastLineOfDefense);

        container.prepend(this.app.view);
    };

    return Field;
});
