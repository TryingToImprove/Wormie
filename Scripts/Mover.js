define(["Calculations"], function (Calculations) {
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

    Mover.prototype.right = function () {
        var tempX = this.position.x;

        Calculations.add(this, function () {
            this.position.x += (this.movementSpeed.x / 10);
        }, function () {
            return (this.position.x >= (tempX + this.movementSpeed.x));
        });
    };

    Mover.prototype.left = function () {
        var tempX = this.position.x;

        Calculations.add(this, function () {
            this.position.x -= (this.movementSpeed.x / 10);
        }, function () {
            return (this.position.x <= (tempX - this.movementSpeed.x));
        });
    };

    Mover.prototype.up = function () {
        var tempY = this.position.y;

        Calculations.add(this, function () {
            this.position.y -= (this.movementSpeed.y / 10);
        }, function () {
            return (this.position.y <= (tempY - this.movementSpeed.y));
        });
    };

    Mover.prototype.down = function () {
        var tempY = this.position.y;

        Calculations.add(this, function () {
            this.position.y += (this.movementSpeed.y / 10);
        }, function () {
            return (this.position.y >= (tempY + this.movementSpeed.y));
        });
    };

    Mover.prototype.moveTo = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    };

    return Mover;
});