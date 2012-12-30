define(["Factories/WormsFactory"], function (WormFactory) {
    "use strict";

    var App;

    function User(name) {
        App = require("App");

        this.name = name;
    }

    User.prototype.getWorms = function () {
        return this.worms;
    };

    User.prototype.setWorms = function (worms) {
        this.worms = worms;
    };

    User.prototype.wormDied = function (diedWorm) {
        var worms = this.getWorms(),
            i, worm,
            length = worms.length;

        for (i = length - 1; i >= 0; i -= 1) {
            worm = worms[i];

            if (diedWorm === worm) {
                worms.splice(i, 1);
            }
        }

        this.setWorms(worms);
    }

    return User;
});