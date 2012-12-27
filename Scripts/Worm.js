define(["Mover", "App", "Canvas"], function (Mover, App, Canvas) {
    "use strict";


    function Worm(x, y) {
        this.position = {
            x: x,
            y: y
        };

        this.mover = new Mover(this.position, {
            yHeight: Canvas.GRID_SETTINGS.y.height(window.app.canvas.canvas),
            xWidth: Canvas.GRID_SETTINGS.x.width(window.app.canvas.canvas)
        });

        this.live();
    }

    Worm.prototype.live = function () {
        function doSomething(context) {
            var randomNum = Math.floor(Math.random() * 3),
                actions = {
                    0: function (mover) {
                        mover.left();
                    },
                    1: function (mover) {
                        mover.right();
                    },
                    2: function (mover) {
                        mover.down();
                    },
                    3: function (mover) {
                        mover.up();
                    }
                };

            actions[randomNum](context.mover);

            setTimeout(function () {
                doSomething(context);
            }, 500);
        }

        doSomething(this);
    }

    Worm.prototype.draw = function (ctx, rowHeight, colWidth) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y, colWidth, rowHeight);
    };

  /*  Worm.createStandard = function () {
        return new Worm(0, 0);
    };
*/
    return Worm;
});