define(["Worm"], function (Worm) {
    "use strict";

    function WormsFactory() {

    }

    WormsFactory.prototype.create = function (worm) {
        var position = worm.lastPosition;

        return new Worm(position.x, position.y);
    };

    return new WormsFactory();
});