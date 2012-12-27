define([], function () {
    "use strict";

    function User(name) {
        this.name = name;
    }

    User.prototype.save = function () {
        localStorage.setItem(User.DEFAULT_LOCALSTORAGE_NAME, JSON.stringify(this));
    };

    User.loadFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem(User.DEFAULT_LOCALSTORAGE_NAME));
    };

    User.checkForUserInLocalStorage = function () {
        return !!localStorage.getItem(User.DEFAULT_LOCALSTORAGE_NAME);
    };

    User.DEFAULT_LOCALSTORAGE_NAME = "User";

    return User;
});