define('field', ['pixi'], function (PIXI) {
    var BORDER_WIDTH = 5;

    return function Field(container) {
        this.app = new PIXI.Application({
            width: window.innerWidth / 9 * 3,
            height: window.innerHeight - (2 * BORDER_WIDTH),
            transparent: true
        });

        let topLastLineOfDefense = this.app._options.height - 70;

        this.lastLineOfDefense = new PIXI.Graphics()
            .lineStyle(2, 0xffffff)
            .moveTo(0, topLastLineOfDefense)
            .lineTo(this.app._options.width, topLastLineOfDefense)

        container.prepend(this.app.view);
        this.app.stage.addChild(this.lastLineOfDefense);
    };
});
