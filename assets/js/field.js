define('field', ['pixi', 'player'], function (PIXI, Player) {
    var BORDER_WIDTH = 5;
    var HOME_BASE_HEIGHT = 70;

    return function Field(container) {
        this.app = new PIXI.Application({
            width: window.innerWidth / 9 * 3,
            height: window.innerHeight - (2 * BORDER_WIDTH),
            transparent: true
        });

        let topLastLineOfDefense = this.app._options.height - HOME_BASE_HEIGHT;

        this.lastLineOfDefense = new PIXI.Graphics()
            .lineStyle(2, 0xffffff)
            .moveTo(0, topLastLineOfDefense)
            .lineTo(this.app._options.width, topLastLineOfDefense)

        this.player = new Player();

        this.player.setPosition(
          this.app._options.width / 2,
          topLastLineOfDefense + HOME_BASE_HEIGHT / 2
        );

        container.prepend(this.app.view);
        this.app.stage.addChild(this.lastLineOfDefense);
        this.player.addToStage(this.app.stage);
    };
});
