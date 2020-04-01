define('enemyBase', ['pixi', 'enemy'], function (PIXI, Enemy) {
  function EnemyBase(app, travelDistance, playerPosition) {
    let enemy = new Enemy(app);
    let x = getRandomInt(
      enemy.getWidth() / 4,
      app._options.width - enemy.getWidth() / 4
    );

    enemy.setPosition(x, -45);
    enemy.setTravelDistance(travelDistance);
    enemy.aimAt(playerPosition);
    enemy.startMovement();
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return EnemyBase;
});
