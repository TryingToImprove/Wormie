define(["Models/Worm"], function (Worm) {
    "use strict";

    function WormsFactory() {

    }

    WormsFactory.prototype.create = function (worm) {
        var position = worm.lastPosition,
            createdWorm = new Worm(position.x, position.y);

        createdWorm.setState(worm.state);

        return createdWorm;
    };

    WormsFactory.prototype.createMultiple = function (wormsData) {
        var worms = [], i, length = wormsData.length;

        for (i = 0; i < length; i += 1) {
            worms.push(this.create(wormsData[i]));
        }

        return worms;
    };

    WormsFactory.prototype.stringify = function (worms) {
        var i;

        for (i = 0; i < worms.length; i += 1) {
            delete worms[i].graphic;
        }

        return worms;
    };

    return new WormsFactory();
});