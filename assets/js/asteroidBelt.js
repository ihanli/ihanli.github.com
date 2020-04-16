define(
  'asteroidBelt',
  [
    'pixi',
    'asteroid'
  ],
  function (
    PIXI,
    Asteroid
  ) {
    function AsteroidBelt(app, travelDistance, playerPosition) {
      let asteroid = new Asteroid();
      let x = getRandomInt(
        asteroid.width / 2,
        app._options.width - asteroid.width / 2
      );

      asteroid.position.set(x, -45);
      asteroid.travelDistance = travelDistance;
      asteroid.aimAt(playerPosition);

      app.stage.addChild(asteroid);

      asteroid.startMovement();
    };

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return AsteroidBelt;
  }
);
