define(["Worm", "Canvas"], function (Worm, Canvas) {
    "use strict";

    function User(name, worm) {
        this.name = name;

        var worms = [], s = Canvas.GRID_SETTINGS;
        console.log(s);
        for(var i = 0; i < 30; i += 1){
            var wormie = new Worm(
                s.x.width() * (Math.floor(Math.random() * s.x.size)),
                s.y.height() * (Math.floor(Math.random() * s.y.size))
            );

            worms.push(wormie);
        }

        this.worms = worms;

        this.worm = (!worm) ? new Worm(0, 0) : new Worm(worm.position.x, worm.position.y);
    }

    User.prototype.save = function () {
        localStorage.setItem(User.DEFAULT_LOCALSTORAGE_NAME, JSON.stringify(this));
    };

    User.loadFromLocalStorage = function () {
        var parsed = JSON.parse(localStorage.getItem(User.DEFAULT_LOCALSTORAGE_NAME)),
            user = new User(parsed.name, parsed.worm); // THIS LINE OF CODE SHOULD BE REFACTORED

        return user;
    };

    User.checkForUserInLocalStorage = function () {
        return !!localStorage.getItem(User.DEFAULT_LOCALSTORAGE_NAME);
    };

    User.DEFAULT_LOCALSTORAGE_NAME = "User";

    return User;
});