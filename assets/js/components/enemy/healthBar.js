define('components/enemy/healthBar', ['pixi'], function (PIXI) {
  var STYLE = {
    fill: 'white',
    fontSize: 13
  };

  function HealthBar(value) {
    let offset = 0;

    this.container = new PIXI.Container();
    this.container.position.set(0, 0);

    for (var i = 0; i < value.length; i++) {
      let letter = new PIXI.Text(value.charAt(i), STYLE)
      letter.position.x = offset;

      this.container.addChild(letter);

      offset += letter.width;
    }

    this.container.position.x = offset / -2;
  };

  HealthBar.prototype.getText = function () {
    return this.container;
  };

  HealthBar.prototype.setY = function (y) {
    this.container.position.y = y;
  };

  HealthBar.prototype.getWidth = function () {
    return this.container.width;
  };

  HealthBar.prototype.getHeight = function () {
    return this.container.height;
  };

  return HealthBar;
});
