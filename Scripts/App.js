define(["Canvas", "User", "Calculations"], function (Canvas, User, Calculations) {
    "use strict";

    var getUser, drawing;

    function App(canvas) {
        this.canvas = new Canvas(canvas, document.body.offsetWidth, (document.body.offsetHeight / 100) * 90.8);
    }

    App.prototype.start = function () {
        this.user = getUser();

        alert("Hi " + this.user.name);
        alert("app started");

        this.canvas.addDrawing(this.user.worm, 0, 0);

        drawing(this);
    };

    drawing = function (context) {
        webkitRequestAnimationFrame(function () {

            Calculations.perform();

            context.canvas.draw();

            //context.user.save();

            drawing(context);
        });
    }

    getUser = function () {
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
    return App;
});