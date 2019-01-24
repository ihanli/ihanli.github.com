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
