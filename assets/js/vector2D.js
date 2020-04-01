define('vector2D', ['pixi'], function (PIXI) {
  function Vector2D(length, angle) {
    this.length = length;
    this.angle = angle;
  }

  Vector2D.createFromCartesian = function (x, y) {
    let length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    return new Vector2D(length, Math.asin(x / length));
  }

  Vector2D.prototype.getX = function () {
    return this.getLength() * this.getSine();
  };

  Vector2D.prototype.getY = function () {
    return this.getLength() * this.getCosine();
  };

  Vector2D.prototype.getLength = function () {
    return this.length;
  };

  Vector2D.prototype.getAngle = function () {
    return this.angle;
  };

  Vector2D.prototype.setAngle = function (angle) {
    this.angle = angle;
  };

  Vector2D.prototype.getSine = function () {
    return Math.sin(this.getAngle());
  };

  Vector2D.prototype.getCosine = function () {
    return Math.cos(this.getAngle());
  };

  Vector2D.prototype.getTangent = function () {
    return Math.tan(this.getAngle());
  };

  return Vector2D;
});
