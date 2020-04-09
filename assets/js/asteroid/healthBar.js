define(
  'asteroid/healthBar',
  [
    'pixi'
  ],
  function (
    PIXI
  ) {
    const STYLE = {
      fill: 'white',
      fontSize: 13
    };

    return class HealthBar extends PIXI.Container {
      constructor(value) {
        super();

        let offset = 0;

        for (var i = 0; i < value.length; i++) {
          let letter = new PIXI.Text(value.charAt(i), STYLE)
          letter.position.x = offset;

          this.addChild(letter);

          offset += letter.width;
        }

        this.position.set(offset / -2, 0);
      }
    };
});
