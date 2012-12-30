define(["AppSettings", "Models/Worm", "Factories/NameFactory"], function (AppSettings, Worm, NameFactory) {
    "use strict";

    function WormsFactory() {
    }

    WormsFactory.prototype.create = function (worm, user) {
        var position = worm.position,
            name = worm.name || NameFactory.createFullName(),
            createdWorm = new Worm(name, position.x, position.y, user);

        if (worm.state) { createdWorm.setState(worm.state); } else { createdWorm.setState("happy"); }

        return createdWorm;
    };

    WormsFactory.prototype.createMultiple = function (wormsData, user) {
        var worms = [], i, length = wormsData.length;

        console.log("te", user);

        for (i = 0; i < length; i += 1) {
            worms.push(this.create(wormsData[i], user));
        }

        return worms;
    };

    WormsFactory.prototype.createRandom = function (user, amount) {
        var worms = [], s = AppSettings.CANVAS, i;

        for (i = 0; i < amount; i += 1) {
            var wormie = this.create({
                position: {
                    x: (Math.floor(Math.random() * s.xAxis.size)),
                    y: (Math.floor(Math.random() * s.yAxis.size))
                }
            }, user);

            worms.push(wormie);
        }

        return worms;
    };

    WormsFactory.prototype.stringify = function (worms) {
        var tempWorms = [], i;

        for (i = 0; i < worms.length; i += 1) {
            tempWorms.push(worms[i].toSaveObject());
        }

        return tempWorms;
    };

    return new WormsFactory();
});