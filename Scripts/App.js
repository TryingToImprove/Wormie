define(["Canvas", "User"], function (Canvas, User) {
    "use strict";

    function getUser() {
        var user, name;

        if (User.checkForUserInLocalStorage()) {
            user =  User.loadFromLocalStorage();
        } else {
            name = window.prompt("Enter your name:");
            user = new User(name);

            user.save();
        }

        return user;
    }

    function App(canvas) {
        this.canvas = new Canvas(canvas);
    }

    App.prototype.start = function () {
        this.user = getUser();

        alert("Hi " + this.user.name);
        alert("app started");
    };

    return App;
});