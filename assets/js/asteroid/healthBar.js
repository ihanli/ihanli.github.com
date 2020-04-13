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
      fontSize: 13,
      align: 'center'
    };

    return class HealthBar extends PIXI.Container {
      constructor(value) {
        super();

        let offset = 0;

        for (var i = 0; i < value.length; i++) {
          let letter = new PIXI.Text(value.charAt(i), STYLE);

          offset += letter.width / 2;

          letter.anchor.set(0.5);
          letter.position.x = offset;

          this.addChild(letter);

          offset += letter.width / 2;
        }

        this.position.set(offset / -2, 0);
      };

      get currentLetter() {
        return this.children[0].text;
      };
    };
});
