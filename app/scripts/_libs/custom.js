;(function () {
  String.prototype.toCamelCase = function () {
    return this.valueOf().replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  }

  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }

  Number.prototype.toDeg = function () {
    return this * 180 / Math.PI;
  }

  // Object assign polyfill
  if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
      value: function assign(target) {
        'use strict';

        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) {
            for (var nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }
})();
