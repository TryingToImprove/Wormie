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

        Calculations.add(this, //CONTEXT
            function () { //CALUCATE
                this.position.x += (this.movementSpeed.x / 10);
            },
            function () { //HAVE CALCULATED
                var a = this.position.x,
                    b = tempX + this.movementSpeed.x;

                return (a < b + 0.0001) && (a > b - 0.0001);
            }
        );
    };

    Mover.prototype.left = function () {
        var tempX = this.position.x;

        Calculations.add(this, function () {
            this.position.x -= (this.movementSpeed.x / 10);
        }, function () {
            var a = this.position.x,
                b = tempX - this.movementSpeed.x;

            return (a < b + 0.0001) && (a > b - 0.0001);
        });
    };

    Mover.prototype.up = function () {
        var tempY = this.position.y;

        Calculations.add(this, function () {
            this.position.y -= (this.movementSpeed.y / 10);
        }, function () {
            var a = this.position.y,
                b = tempY - this.movementSpeed.y;

            return (a < b + 0.0001) && (a > b - 0.0001);
        });
    };

    Mover.prototype.down = function () {
        var tempY = this.position.y;

        Calculations.add(this, function () {
            this.position.y += (this.movementSpeed.y / 10);
        }, function () {
            var a = this.position.y,
                b = tempY + this.movementSpeed.y;

            return (a < b + 0.0001) && (a > b - 0.0001);
        });
    };

    Mover.prototype.moveTo = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    };

    return Mover;
});