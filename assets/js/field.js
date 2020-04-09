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

    return class Field {
      constructor() {
        let app = new PIXI.Application({
          width: window.innerWidth / 9 * 3,
          height: window.innerHeight - (2 * BORDER_WIDTH),
          transparent: true
        });
        let topLastLineOfDefense = app._options.height - HOME_BASE_HEIGHT;
        let spaceShip = new SpaceShip();

        spaceShip.position.set(app._options.width / 2, topLastLineOfDefense + HOME_BASE_HEIGHT / 2);

        this.lastLineOfDefense = new PIXI.Graphics()
            .lineStyle(2, 0xffffff)
            .moveTo(0, topLastLineOfDefense)
            .lineTo(app._options.width, topLastLineOfDefense)

        app.stage.addChild(this.lastLineOfDefense, spaceShip);

        this.asteroidBelt = new AsteroidBelt(app, topLastLineOfDefense, spaceShip.position);
        this.view = app.view;
      }
    };
  }
);
