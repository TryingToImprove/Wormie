define(
    ["Drawing/Canvas", "User", "Calculations", "Managers/AssetManager", "Factories/UserFactory", "AppSettings", "Drawing/Graphics/WormGraphic"],
    function (Canvas, User, Calculations, AssetManager, UserFactory) {
        "use strict";

        var getUser, drawing;

        function App(canvas) {
            this.canvas = new Canvas(canvas, document.body.offsetWidth, (document.body.offsetHeight / 100) * 90.8);
            this.resources = new AssetManager();
        }

        App.prototype.start = function () {
            var user, name;

            if (App.checkForUserInLocalStorage()) {
                this.user =  App.loadFromLocalStorage().user;
            } else {
                name = window.prompt("Enter your name:");
                this.user = new User(name);
                this.save();
            }

            this.resources.queueDownload("/Images/happy.png");
            this.resources.download(function (context) {
                return function () {
                    context.finishLoading.call(context);
                };
            }(this));

            window.addEventListener("beforeunload", function () {
                //window.app.save();
            }, false);

        };

        App.prototype.finishLoading = function () {
            var canvas = this.canvas, i, user = this.user;

            require(["Drawing/Graphics/GridGraphic"], function (GridGraphic) {
                for (i = 0; i < user.worms.length; i += 1) {
                    canvas.addDrawing(user.worms[i].graphic, 1);
                }

                canvas.addDrawing(new GridGraphic(), 50);
            });

            drawing(this);
        }

        App.prototype.save = function () {
            var data = {
                lastSave: Date.now(),
                user: UserFactory.stringify(this.user)
            };

            localStorage.setItem(App.DEFAULT_LOCALSTORAGE_NAME, JSON.stringify(data));
        };

        App.loadFromLocalStorage = function () {
            var data = JSON.parse(localStorage.getItem(App.DEFAULT_LOCALSTORAGE_NAME)),
                user = UserFactory.create(data.user);

            var debug = document.getElementById("debug");
            var child = document.createElement("div");
            child.innerText = JSON.stringify(data.user);
            //debug.appendChild(child);

            console.log(data);

            return {
                lastSave: data.lastSave,
                user: user
            };
        };

        App.checkForUserInLocalStorage = function () {
            return !!localStorage.getItem(App.DEFAULT_LOCALSTORAGE_NAME);
        };

        App.DEFAULT_LOCALSTORAGE_NAME = "App";

        drawing = function (context) {
            webkitRequestAnimationFrame(function () {

                Calculations.perform();

                context.canvas.draw();

                //context.user.save();

                drawing(context);
            });
        }
        return App;
    }
);