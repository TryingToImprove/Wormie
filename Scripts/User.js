define(["Worm"], function (Worm) {
    "use strict";

    function User(name, worm) {
        this.name = name;

        this.worm = (!worm) ? new Worm(200, 200) : new Worm(worm.position.x, worm.position.y);
    }

    User.prototype.save = function () {
        localStorage.setItem(User.DEFAULT_LOCALSTORAGE_NAME, JSON.stringify(this));
    };

    User.loadFromLocalStorage = function () {
        var parsed = JSON.parse(localStorage.getItem(User.DEFAULT_LOCALSTORAGE_NAME)),
            user = new User(parsed.name, parsed.worm);

        return user;
    };

    User.checkForUserInLocalStorage = function () {
        return !!localStorage.getItem(User.DEFAULT_LOCALSTORAGE_NAME);
    };

    User.DEFAULT_LOCALSTORAGE_NAME = "User";

    return User;
});