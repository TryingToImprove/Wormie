define(["Worm", "Canvas"], function (Worm, Canvas) {
    "use strict";

    function User(name) {
        this.name = name;



        //this.worm = (!worm) ? new Worm(0, 0) : new Worm(worm.position.x, worm.position.y);
    }

    User.prototype.getWorms = function () {
        if (!this.worms) {
            var worms = [], s = Canvas.GRID_SETTINGS;

            for (var i = 0; i < 30; i += 1) {
                var wormie = new Worm(
                    s.x.width() * (Math.floor(Math.random() * s.x.size)),
                    s.y.height() * (Math.floor(Math.random() * s.y.size))
                );

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