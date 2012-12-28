define(["Calculations", "Canvas"], function (Calculations, Canvas) {
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

    var assert = {
        almostEqual: function (actual, expected) {
            var precision;

            if (!precision) { precision = 5; }

            return Math.abs(actual - expected) < 0.5 * Math.pow(10, -precision);//(a < b + 0.0001) && (a > b - 0.0001);
        }
    };

    Mover.prototype.right = function (options) {
        var tempX = this.position.x,
            finishCallback = (options && options.finishFunc) ? options.finishFunc : null;

        if (!assert.almostEqual(tempX, (Canvas.GRID_SETTINGS.x.width() * (Canvas.GRID_SETTINGS.x.size - 1)))) {
            Calculations.add(this, //CONTEXT
                function () { //CALUCATE
                    this.position.x += (this.movementSpeed.x / 10);
                },
                function () { //HAVE CALCULATED
                    var a = this.position.x,
                        b = tempX + this.movementSpeed.x;

                    return assert.almostEqual(a, b); //(a < b + 0.0001) && (a > b - 0.0001);
                }, finishCallback);
        } else {
            if (finishCallback) {
                finishCallback();
            }
        }
    };

    Mover.prototype.left = function (options) {
        var tempX = this.position.x,
            finishCallback = (options && options.finishFunc) ? options.finishFunc : null;

        if (!assert.almostEqual(tempX, 0)) {
            Calculations.add(this, function () {
                this.position.x -= (this.movementSpeed.x / 10);
            }, function () {
                var a = this.position.x,
                    b = tempX - this.movementSpeed.x;

                return assert.almostEqual(a, b); //(a < b + 0.0001) && (a > b - 0.0001);
            }, finishCallback);
        } else {
            if (finishCallback) {
                finishCallback();
            }
        }
    };

    Mover.prototype.up = function (options) {
        var tempY = this.position.y,
            finishCallback = (options && options.finishFunc) ? options.finishFunc : null;

        if (!assert.almostEqual(tempY, 0)) {
            Calculations.add(this, function () {
                this.position.y -= (this.movementSpeed.y / 10);
            }, function () {
                var a = this.position.y,
                    b = tempY - this.movementSpeed.y;

                return assert.almostEqual(a, b); //(a < b + 0.0001) && (a > b - 0.0001);
            }, finishCallback);
        } else {
            if (finishCallback) {
                finishCallback();
            }
        }
    };

    Mover.prototype.down = function (options) {
        var tempY = this.position.y,
            finishCallback = (options && options.finishFunc) ? options.finishFunc : null;

        if (!assert.almostEqual(tempY, (Canvas.GRID_SETTINGS.y.height() * (Canvas.GRID_SETTINGS.y.size - 1)))) {
                Calculations.add(this, function () {
                this.position.y += (this.movementSpeed.y / 10);
            }, function () {
                var a = this.position.y,
                    b = tempY + this.movementSpeed.y;

                return assert.almostEqual(a, b); //(a < b + 0.0001) && (a > b - 0.0001);
                }, finishCallback);
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