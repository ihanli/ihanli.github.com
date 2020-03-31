define('vector2D', ['pixi'], function (PIXI) {
  function Vector2D(x, y) {
    this.point = new PIXI.Point(x, y);
  };

  Vector2D.prototype.getX = function () {
    return this.point.x;
  };

  Vector2D.prototype.setX = function (x) {
    this.point.x = x;
  };

  Vector2D.prototype.getY = function () {
    return this.point.y;
  };

  Vector2D.prototype.setY = function (y) {
    this.point.y = y;
  };

  Vector2D.prototype.getLength = function () {
    return Math.sqrt(Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2));
  };

  return Vector2D;
});
