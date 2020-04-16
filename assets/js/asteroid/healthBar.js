define(
  'asteroid/healthBar',
  [
    'pixi',
    'asteroid/letter'
  ],
  function (
    PIXI,
    Letter
  ) {
    return class HealthBar extends PIXI.Container {
      constructor(value) {
        super();

        let offset = 0;

        for (var i = 0; i < value.length; i++) {
          let letter = new Letter(value.charAt(i));

          offset += letter.width / 2;

          letter.anchor.set(0.5);
          letter.position.x = offset;

          this.addChild(letter);

          offset += letter.width / 2;
        }

        this.position.set(offset / -2, 0);
      };

      decreaseHealth() {
        this.currentLetter.blowUp();
      };

      get currentLetter() {
        return this.children[0];
      };
    };
  }
);
