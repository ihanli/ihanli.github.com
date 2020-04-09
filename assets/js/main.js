require.config({
    paths: {
      'pixi': 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.4/pixi.min'
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
