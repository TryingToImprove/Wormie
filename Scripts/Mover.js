define([], function () {
    "use strict";

    var Mover = function (position, movementSpeed){

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

        if (!movementSpeed) {
            throw new Error("movementSpeed is required");
        }

        if (typeof movementSpeed !== "number") {
            throw new Error("movementSpeed must be a number");
        }

        //Set parameters on object
        this.position = position;
        this.movementSpeed = movementSpeed;
    };

    Mover.prototype.right = function () {
        this.position.x += this.movementSpeed;
    };

    Mover.prototype.left = function () {
        this.position.x -= this.movementSpeed;
    };

    return Mover;
})