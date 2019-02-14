define('player', ['pixi'], function (PIXI) {
  function Player() {
    // this.container = new PIXI.Container();
    this.mask = new PIXI.Graphics();

    // this.mask.x = 100;
    // this.mask.y = 100;
    // this.mask.width = 300;
    // this.mask.height = 300;

    this.sprite = PIXI.Sprite.fromImage('/assets/images/sheet.png');

    this.mask.beginFill(0xFFFFFF);
    this.mask.drawRect(0,0,this.sprite.width/this.sprite.scale.x,this.sprite.height/this.sprite.scale.y);
    this.mask.endFill();

    this.sprite.mask = this.mask;
    this.sprite.addChild(this.mask);

    // this.container.addChild(this.sprite);
    // this.container.addChild(this.mask);
  };

  Player.prototype.addToStage = function (stage) {
    // this.container.mask = this.mask;
    // stage.addChild(this.container);
    // stage.addChild(this.mask);
    stage.addChild(this.sprite);
  };

  return Player;
});
