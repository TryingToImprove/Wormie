define(["AppSettings", "Models/Worm"], function (AppSettings, Worm) {
    "use strict";

    function User(name) {
        this.name = name;
    }

    User.prototype.getWorms = function () {
        if (!this.worms) {
            var worms = [], s = AppSettings.CANVAS;

            var smileys = ["happy", "unhappy"];

            for (var i = 0; i < 30; i += 1) {
                var wormie = new Worm(
                    s.xAxis.width() * (Math.floor(Math.random() * s.xAxis.size)),
                    s.yAxis.height() * (Math.floor(Math.random() * s.yAxis.size))
                );

                wormie.setState(smileys[Math.floor(Math.random()*smileys.length)]);

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