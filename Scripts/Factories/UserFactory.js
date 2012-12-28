define(["User", "Factories/WormsFactory"], function (User, WormsFactory) {
    "use strict";

    function UserFactory() {

    }

    UserFactory.prototype.create = function (userData) {
        var user;

        user = new User(userData.name);

        user.setWorms(WormsFactory.createMultiple(userData.worms));

        return user;
    };

    UserFactory.prototype.stringify = function (user) {
        var userData = {
            name: null,
            worms: null
        };

        userData.name = user.name;
        userData.worms = user.getWorms();

        return userData;
    }

    return new UserFactory();

});