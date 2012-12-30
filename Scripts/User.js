define(["AppSettings", "Factories/WormsFactory"], function (AppSettings, WormFactory) {
    "use strict";

    function User(name) {
        this.name = name;
    }

    User.prototype.getWorms = function () {
        if (!this.worms) {
            var worms = [], s = AppSettings.CANVAS;

            var smileys = ["happy", "unhappy"];

            for (var i = 0; i < 30; i += 1) {
                var wormie = WormFactory.create({
                    position: {
                        x: (Math.floor(Math.random() * s.xAxis.size)),
                        y: (Math.floor(Math.random() * s.yAxis.size))
                    },
                    state: smileys[Math.floor(Math.random()*smileys.length)]
                });

                worms.push(wormie);
            }

            this.setWorms(worms);
        }

        return this.worms;
    };

    User.prototype.setWorms = function(worms){
        this.worms = worms;
    };

    return User;
});