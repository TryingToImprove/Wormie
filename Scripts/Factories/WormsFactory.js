define(["Worm"], function (Worm) {
    "use strict";

    function WormsFactory() {

    }

    WormsFactory.prototype.create = function (worm) {
        var position = worm.lastPosition;

        return new Worm(position.x, position.y);
    };

    WormsFactory.prototype.createMultiple = function (wormsData) {
        var worms = [], i, length = wormsData.length;

        for (i = 0; i < length; i += 1) {
            worms.push(this.create(wormsData[i]));
        }

        return worms;
    }

    return new WormsFactory();
});