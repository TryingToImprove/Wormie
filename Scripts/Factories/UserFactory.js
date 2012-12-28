define(["User", "Factories/WormsFactory"], function (User, WormsFactory) {
    "use strict";

    function UserFactory() {

    }

    UserFactory.prototype.create = function (userData) {
        var user;

        user = new User(userData.name);

        var worms = [];
        for (var i = 0; i < user.worms.length; i+= 1) {
            worms.push(WormsFactory.create(user.worms[i]));
        }
        console.log(worms);

        userData.worms = worms;

        return user;
    };

    UserFactory.prototype.stringify = function (user) {
        var userData = {
            name: null,
            worms: null
        };

        userData.name = user.name;
        userData.worms = user.worms;

        return userData;
    }

    return new UserFactory();

});