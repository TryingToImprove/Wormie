define(["Calculations", "Canvas", "Assert"], function (Calculations, Canvas, Assert) {
    "use strict";

    var Mover = function (position, options) {

        if (arguments.length === 0) {
            throw new Error("Parameters are required");
        }

        if (!position) {
            throw new Error("position is required");
        }

        if ((!position.x && position.x !== 0) || typeof position.x !== "number") {
            throw new Error("position.x is not valid");
        }

        if ((!position.y && position.y !== 0) || typeof position.y !== "number") {
            throw new Error("position.y is not valid");
        }

        //Set parameters on object
        this.position = position;
        this.movementSpeed = {
            x: options.xWidth,
            y: options.yHeight
        };
    };

    Mover.prototype.right = function (options) {
        var tempX = this.position.x,
            finishCallback = (options && options.finish) ? options.finish : null;

        if (!Assert.almostEqual(tempX, (Canvas.GRID_SETTINGS.x.width() * (Canvas.GRID_SETTINGS.x.size - 1)))) {
            Calculations.add(this, {
                calculate: function () {
                    this.position.x += (this.movementSpeed.x / 10);
                },
                doneWhen: function () {
                    var a = this.position.x,
                        b = tempX + this.movementSpeed.x;

                    return Assert.almostEqual(a, b); //(a < b + 0.0001) && (a > b - 0.0001);
                },
                finish: finishCallback
            });
        } else {
            if (finishCallback) {
                finishCallback();
            }
        }
    };

    Mover.prototype.left = function (options) {
        var tempX = this.position.x,
            finishCallback = (options && options.finish) ? options.finish : null;

        if (!Assert.almostEqual(tempX, 0)) {

            Calculations.add(this, {
                calculate: function () {
                    this.position.x -= (this.movementSpeed.x / 10);
                },
                doneWhen: function () {
                    var a = this.position.x,
                        b = tempX - this.movementSpeed.x;

                    return Assert.almostEqual(a, b);
                },
                finish: finishCallback
            });

        } else {
            if (finishCallback) {
                finishCallback();
            }
        }
    };

    Mover.prototype.up = function (options) {
        var tempY = this.position.y,
            finishCallback = (options && options.finish) ? options.finish : null;

        if (!Assert.almostEqual(tempY, 0)) {

            Calculations.add(this, {
                calculate: function () {
                    this.position.y -= (this.movementSpeed.y / 10);
                },
                doneWhen: function () {
                    var a = this.position.y,
                        b = tempY - this.movementSpeed.y;

                    return Assert.almostEqual(a, b); //(a < b + 0.0001) && (a > b - 0.0001);
                },
                finish: finishCallback
            });

        } else {
            if (finishCallback) {
                finishCallback();
            }
        }
    };

    Mover.prototype.down = function (options) {
        var tempY = this.position.y,
            finishCallback = (options && options.finish) ? options.finish : null;

        if (!Assert.almostEqual(tempY, (Canvas.GRID_SETTINGS.y.height() * (Canvas.GRID_SETTINGS.y.size - 1)))) {
            Calculations.add(this, {
                calculate: function () {
                    this.position.y += (this.movementSpeed.y / 10);
                },
                doneWhen: function () {
                    var a = this.position.y,
                        b = tempY + this.movementSpeed.y;

                    return Assert.almostEqual(a, b); //(a < b + 0.0001) && (a > b - 0.0001);
                },
                finish: finishCallback
            });
        } else {
            if (finishCallback) {
                finishCallback();
            }
        }
    };

    Mover.prototype.moveTo = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    };

    return Mover;
});