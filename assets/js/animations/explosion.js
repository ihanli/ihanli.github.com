define(
  'animations/explosion',
  [
    'pixi'
  ],
  function (
    PIXI
  ) {
    const TARGET_SCALE = 0.9;
    const SCALE_INCREASE_RATE = 0.3;
    const SCALE_DECREASE_RATE = 0.45;

    function expand(context, callback) {
      if (typeof callback !== 'function') {
        callback = function () {};
      }

      let animate = function () {
        if (context.scale.x >= TARGET_SCALE) {
          PIXI.ticker.shared.remove(animate);
          callback(context);

          return;
        }

        context.scale.set(context.scale.x + SCALE_INCREASE_RATE);
      };

      PIXI.ticker.shared.add(animate);
    };

    function collapse(context, callback) {
      if (typeof callback !== 'function') {
        callback = function () {};
      }

      let animate = function () {
        if (context.scale.x <= 0) {
          PIXI.ticker.shared.remove(animate);
          callback(context);

          return;
        }

        context.scale.set(context.scale.x - SCALE_DECREASE_RATE);
      };

      PIXI.ticker.shared.add(animate);
    }

    return class Explosion extends PIXI.Sprite {
      constructor() {
        super(PIXI.Texture.from('/assets/images/explosion.png'));

        this.scale.set(0);
        this.anchor.set(0.5, 0.5);
        this.position.set(0, 0);
      };

      animate(afterExpandCallback, afterCollapseCallback) {
        if (typeof afterExpandCallback !== 'function') {
          afterExpandCallback = function () {};
        }

        expand(this, function (context) {
          afterExpandCallback(context);
          collapse(context, afterCollapseCallback);
        });
      };
    };
  }
);
