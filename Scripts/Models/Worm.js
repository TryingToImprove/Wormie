define(["Calculations", "Utilities/Mover", "Drawing/Graphics/WormGraphic"], function (Calculations, Mover, WormGraphic) {
    "use strict";

    var App;

    function Worm(name, posX, posY, user) { //implants IDrawable
        App = require("App");

        console.log(user);

        this.user = user;
        this.name = name;

        this.position = {
            grid: {
                current: {
                    x: posX,
                    y: posY
                },
                next: {
                    x: posX,
                    y: posY
                }
            },
            real: {
                x: App.settings.CANVAS.xAxis.get(posX),
                y: App.settings.CANVAS.yAxis.get(posY)
            }
        };

        this.graphic = new WormGraphic(this, this.position.real);

        this.direction = {
            x: 0,
            y: 0
        }

        this.mover = new Mover(this, Worm.MOVEMENT_SPEED);

        this.eatingInterval = (App.settings.WORMS.eatingTime) * (Math.floor(Math.random() * 20)) || 1;
        this.nextFeed = new Date(Date.now() + this.eatingInterval);

        this.live();
    }

    Worm.prototype.clicked = function () {
        App.vent.publish("gameView:worm:click", this);
    };

    Worm.prototype.toSaveObject = function () {
        return {
            name: this.name,
            position: this.position.grid.current,
            state: this.state
        };
    };

    Worm.prototype.setState = function (state) {
        this.state = state;
    };

    Worm.prototype.die = function () {
        this.dead = true;
        this.scene.remove(this);
        this.user.wormDied(this);
    };

    Worm.prototype.update = function () {
        this.eatPercent = Math.abs(Math.floor(((this.eatingInterval / (this.nextFeed.getTime() - Date.now())) - 1) * 100));

        if (this.eatPercent >= 100) {
            this.die();
        } else if (this.eatPercent === 50) {
            this.setState("unhappy");
        }
    };

    Worm.prototype.live = function () {
        function doSomething(context) {
            var randomNum = Math.ceil(Math.random() * 4),
                x = Math.floor(Math.random() * App.settings.CANVAS.xAxis.size) - context.position.grid.current.x,
                y = Math.floor(Math.random() * App.settings.CANVAS.yAxis.size) - context.position.grid.current.y,
                finish = 0,
                finishCallback = function () {
                    finish += 1;
                    if (finish % 1 === 0) {
                        doSomething(context);
                    }
                };

            context.mover.x(x, { finish: finishCallback });
            //context.mover.y(y, { finish: finishCallback });
        }

        Calculations.add(this, {
            calculate: this.update,
            doneWhen: function () {
                return this.dead;
            }
        });

        doSomething(this);
    };

    Worm.MOVEMENT_SPEED = {
        x: 50,
        y: 30
    };

    return Worm;
});