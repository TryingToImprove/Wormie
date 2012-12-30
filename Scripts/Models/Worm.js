define(["AppSettings", "Calculations", "Utilities/Mover", "Drawing/Graphics/WormGraphic"], function (AppSettings, Calculations, Mover, WormGraphic) {
    "use strict";

    function Worm(posX, posY) { //implants IDrawable
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
                x: AppSettings.CANVAS.xAxis.get(posX),
                y: AppSettings.CANVAS.yAxis.get(posY)
            }
        };

        this.graphic = new WormGraphic(this, this.position.real);

        this.mover = new Mover(this, Worm.MOVEMENT_SPEED);
        this.live();
    }

    Worm.prototype.toSaveObject = function () {
        return {
            position: this.position.grid.current,
            state: this.state
        };
    };

    Worm.prototype.setState = function (state) {
        this.state = state;
    };

    Worm.prototype.live = function () {
        function doSomething(context) {
            var randomNum = Math.ceil(Math.random() * 4),
                x = Math.floor(Math.random() * AppSettings.CANVAS.xAxis.size) - context.position.grid.current.x,
                y = Math.floor(Math.random() * AppSettings.CANVAS.yAxis.size) - context.position.grid.current.y,
                finish = 0,
                finishCallback = function () {
                    finish += 1;
                    if (finish % 2 === 0) {
                        doSomething(context);
                    }
                };

            context.mover.x(x, { finish: finishCallback});
            context.mover.y(y, { finish: finishCallback});
        }

        doSomething(this);
    };

    Worm.MOVEMENT_SPEED = {
        x: 50,
        y: 30
    };

    return Worm;
});