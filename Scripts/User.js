define(["Worm"], function (Worm) {
    "use strict";

    function User(name, worm) {
        this.name = name;

        this.worm = (!worm) ? new Worm(0, 0) : new Worm(worm.position.x, worm.position.y);
    }

    User.prototype.save = function () {
        localStorage.setItem(User.DEFAULT_LOCALSTORAGE_NAME, JSON.stringify(this));
    };

    User.loadFromLocalStorage = function () {
        var parsed = JSON.parse(localStorage.getItem(User.DEFAULT_LOCALSTORAGE_NAME)),
            user = new User(parsed.name, parsed.worm); // THIS LINE OF CODE SHOULD BE REFACTORED TO A Factory-PATTERN

        return user;
    };

    User.checkForUserInLocalStorage = function () {
        return !!localStorage.getItem(User.DEFAULT_LOCALSTORAGE_NAME);
    };

    User.DEFAULT_LOCALSTORAGE_NAME = "User";

    return User;
});