require.config({
    paths: {
      'pixi': 'pixi-4.8.4.min'
    },
    shim: {
      'pixi': {
        exports: 'PIXI'
      }
    }
});

require(['pixi', 'field'], function (PIXI, Field) {
  let gameField = new Field();

  document.getElementById('game-field').prepend(gameField.view);
});
