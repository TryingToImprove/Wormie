define(["Canvas", "User", "Calculations", "AssetManager"], function (Canvas, User, Calculations, AssetManager) {
    "use strict";

    var getUser, drawing;

    function App(canvas) {
        this.canvas = new Canvas(canvas, document.body.offsetWidth, (document.body.offsetHeight / 100) * 90.8);
        this.resources = new AssetManager();
    }

    App.prototype.start = function () {
        this.user = getUser();

        this.resources.queueDownload("/Images/happy.png");
        this.resources.download(function (context) {
            return function () {
                context.finishLoading.call(context);
            };
        }(this));

    };

    App.prototype.finishLoading = function () {
        this.canvas.addDrawing(this.user.worm, 0, 0);

        for (var i = 0; i < this.user.worms.length; i++){
            this.canvas.addDrawing(this.user.worms[i], 0, 0);
        }

        drawing(this);
    }

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