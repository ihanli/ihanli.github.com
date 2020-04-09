define(
  'field',
  [
    'pixi',
    'spaceShip',
    'asteroidBelt'
  ],
  function (
    PIXI,
    SpaceShip,
    AsteroidBelt
  ) {
    const BORDER_WIDTH = 5;
    const HOME_BASE_HEIGHT = 70;

    function Field(container) {
        this.app = new PIXI.Application({
            width: window.innerWidth / 9 * 3,
            height: window.innerHeight - (2 * BORDER_WIDTH),
            transparent: true
        });

        let spaceShip = new SpaceShip();
        let topLastLineOfDefense = this.app._options.height - HOME_BASE_HEIGHT;

        this.lastLineOfDefense = new PIXI.Graphics()
            .lineStyle(2, 0xffffff)
            .moveTo(0, topLastLineOfDefense)
            .lineTo(this.app._options.width, topLastLineOfDefense)

        spaceShip.position.set(this.app._options.width / 2, topLastLineOfDefense + HOME_BASE_HEIGHT / 2);

        this.asteroidBelt = new AsteroidBelt(this.app, topLastLineOfDefense, spaceShip.position);

        this.app.stage.addChild(this.lastLineOfDefense, spaceShip);
        container.prepend(this.app.view);
    };

    return Field;
  }
);
