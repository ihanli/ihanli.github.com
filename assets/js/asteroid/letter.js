define(
  'asteroid/letter',
  [
    'pixi',
    'animations/explosion'
  ],
  function (
    PIXI,
    Explosion
  ) {
    const STYLE = {
      fill: 'white',
      fontSize: 13,
      align: 'center'
    };

    return class Letter extends PIXI.Text {
      constructor(text) {
        super(text, STYLE);

        this.addChild(new Explosion());
      };

      blowUp() {
        this.children[0].animate(
          null,
          function (context) {
            context.parent.destroy();
          }
        );
      };
    };
  }
);
