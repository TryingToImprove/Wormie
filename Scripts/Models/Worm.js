define(["AppSettings", "Utilities/Mover", "Drawing/Graphics/WormGraphic"], function (AppSettings, Mover, WormGraphic) {
    "use strict";

    function Worm(x, y) { //implants IDrawable
        this.position = {
            x: x,
            y: y
        };

        this.lastPosition = {
            x: x,
            y: y
        };

        this.mover = new Mover(this.position, {
            yHeight: AppSettings.CANVAS.yAxis.height(),
            xWidth: AppSettings.CANVAS.xAxis.width()
        });

        this.graphic = new WormGraphic(this);

        this.live();
    }

    Worm.prototype.setState = function(state){
        this.state = state;
    };

    Worm.prototype.live = function () {
        function doSomething(context) {
            var randomNum = Math.ceil(Math.random() * 4),
                finishCallback = function () {
                    doSomething(context);
                },
                actions = {
                    0: function (mover) {
                        mover.left({
                            finish: finishCallback
                        });
                    },
                    1: function (mover) {
                        mover.right({
                            finish: finishCallback
                        });
                    },
                    2: function (mover) {
                        mover.down({
                            finish: finishCallback
                        });
                    },
                    3: function (mover) {
                        mover.up({
                            finish: finishCallback
                        });
                    }
                };

            if (context.position.x < 0 || context.position.y < 0) {
                throw new Error("OUT OF SPACE");
            }

            context.lastPosition = context.position;
            actions[randomNum - 1](context.mover);
        }

        doSomething(this);
    };

    return Worm;
});