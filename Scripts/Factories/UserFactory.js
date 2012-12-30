define(["User", "Factories/WormsFactory"], function (User, WormsFactory) {
    "use strict";

    function UserFactory() {

    }

    UserFactory.prototype.create = function (userData) {
        var user;

        user = new User(userData.name);

        if (userData.worms) {
            user.setWorms(WormsFactory.createMultiple(userData.worms, user));
        } else {
            user.setWorms(WormsFactory.createRandom(user, 20));
        }

        return user;
    };

    UserFactory.prototype.stringify = function (user) {
        var userData = {
            name: null,
            worms: null
        };

        userData.name = user.name;
        userData.worms = WormsFactory.stringify(user.getWorms());

        return userData;
    }

    return new UserFactory();

});