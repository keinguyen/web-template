;(function () {
  document.getElementsByTagName('html')[0].classList.add('js');

  String.prototype.toCamelCase = function () {
    return this.valueOf().replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }

  Number.prototype.toDeg = function () {
    return this * 180 / Math.PI;
  }
})();
