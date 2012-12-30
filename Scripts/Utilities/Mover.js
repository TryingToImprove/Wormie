define(["AppSettings", "Calculations", "Utilities/Assert"], function (AppSettings, Calculations, Assert) {
    "use strict";

    var Mover = function (owner, options) {

        if (arguments.length === 0) {
            throw new Error("Parameters are required");
        }

        if (!owner) {
            throw new Error("position is required");
        }

        if ((!owner.position.x && owner.position.x !== 0) || typeof owner.position.x !== "number") {
            throw new Error("position.x is not valid");
        }

        if ((!owner.position.y && owner.position.y !== 0) || typeof owner.position.y !== "number") {
            throw new Error("position.y is not valid");
        }

        console.log(owner);

        //Set parameters on object
        this.owner = owner;
        this.position = owner.position;
        this.settings = {
            movementSpeed: 80
        };

        this.movementSpeed = {
            x: options.xWidth,
            y: options.yHeight
        };
    };

    Mover.prototype.right = function (options) {
        var tempX = this.position.x,
            finishCallback = (options && options.finish) ? options.finish : null,
            movementSpeed = Math.ceil(this.settings.movementSpeed);

        //if (!Assert.isLarger(tempX, (Canvas.GRID_SETTINGS.x.width() * (Canvas.GRID_SETTINGS.x.size - 1)))) {
        if (Math.floor(tempX + this.movementSpeed.x) <= (AppSettings.CANVAS.xAxis.width() * (AppSettings.CANVAS.xAxis.size - 1))) {
            Calculations.add(this, {
                calculate: function () {
                    console.log(this.owner)
                    var distance = movementSpeed * (this.owner.scene.getCanvas().delta || 1);
                    this.position.x += distance;
                },
                doneWhen: function () {
                    var a = Math.floor(this.position.x),
                        b = Math.floor(tempX + this.movementSpeed.x),
                        valid = a === b;

                    if (a > b) {
                        valid = true;
                        this.position.x = b;
                        a = b;
                    } else if (valid) {
                        this.position.x = Math.floor(this.position.x);
                    }

                    return valid;
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
            finishCallback = (options && options.finish) ? options.finish : null,
            movementSpeed = Math.ceil(this.settings.movementSpeed);

        if (Math.floor(tempX - this.movementSpeed.x) >= -1) {

            Calculations.add(this, {
                calculate: function () {
                    console.log(this.owner.scene)
                    var distance = movementSpeed * (this.owner.scene.getCanvas().delta || 1);
                    this.position.x -= distance;
                },
                doneWhen: function () {
                    var a = Math.floor(this.position.x),
                        b = Math.floor(tempX - this.movementSpeed.x),
                        valid = a === b;

                    if (a < b) {
                        valid = true;
                        this.position.x = b;
                        a = b;
                    } else if (valid) {
                        this.position.x = Math.floor(this.position.x);
                    }

                    return valid;
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
            finishCallback = (options && options.finish) ? options.finish : null,
            movementSpeed = Math.ceil(this.settings.movementSpeed);

        if (!Assert.almostEqual(tempY, 0)) {

            Calculations.add(this, {
                calculate: function () {
                    console.log(this.owner.scene)
                    var distance = movementSpeed * (this.owner.scene.getCanvas().delta || 1);
                    this.position.y -= distance;
                },
                doneWhen: function () {
                    var a = Math.floor(this.position.y),
                        b = Math.floor(tempY - this.movementSpeed.y),
                        valid = a === b;

                    if (a < b) {
                        valid = true;
                        this.position.y = b;
                        a = b;
                    } else if (valid) {
                        this.position.y = Math.floor(this.position.y);
                    }

                    return valid;
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
            finishCallback = (options && options.finish) ? options.finish : null,
            movementSpeed = Math.ceil(this.settings.movementSpeed);

        if (!Assert.isLarger(tempY, (AppSettings.CANVAS.yAxis.height() * (AppSettings.CANVAS.yAxis.size - 1)))) {
            Calculations.add(this, {
                calculate: function () {
                    console.log(this.owner.scene)
                    var distance = movementSpeed * (this.owner.scene.getCanvas().delta || 1);
                    this.position.y += distance;
                },
                doneWhen: function () {
                    var a = Math.floor(this.position.y),
                        b = Math.floor(tempY + this.movementSpeed.y),
                        valid = a === b;

                    if (a > b) {
                        valid = true;
                        this.position.y = b;
                        a = b;
                    } else if (valid) {
                        this.position.y = Math.floor(this.position.y);
                    }

                    return valid;
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