define([], function () {
    "use strict";

    function Assert() {

    }

    Assert.prototype.almostEqual = function (actual, expected, precision) {
        if (!precision) { precision = 7; }

        return Math.abs(actual - expected) < 0.5 * Math.pow(10, -precision);
    };

    Assert.prototype.isLarger = function(a, b){
        return a >= b;
    }

    return new Assert();
});