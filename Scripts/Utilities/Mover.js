define(["AppSettings", "Calculations", "Utilities/Assert"], function (AppSettings, Calculations, Assert) {
    "use strict";

    var Mover = function (context, movementSpeed) {
        context.moving = {};

        var move = function (axis, length, options) {
            if (!this.moving[axis]) {
                var nextPosition = this.position.grid.next[axis] + (length || 1),
                    direction = (nextPosition > this.position.grid.current[axis]) ? 1 : -1, //increment or decrement
                    axisData = AppSettings.CANVAS[axis + "Axis"],
                    max = axisData.max(),
                    size = axisData.size,
                    gridPosition = function (pos) {
                        return axisData.get(pos);
                    };

                if (direction < 0) { //-axis
                    this.direction[axis] = -1;
                } else {
                    this.direction[axis] = 1;
                }

                this.position.grid.next[axis] = nextPosition;
                this.moving[axis] = true;

                Calculations.add(this, {
                    calculate: function () {
                        var distance = movementSpeed[axis] * (this.scene.getCanvas().delta || 1) * direction;
                        this.position.real[axis] += distance;
                    },
                    doneWhen: function () {
                        var a = Math.floor(this.position.real[axis]),
                            b = Math.floor(gridPosition(this.position.grid.next[axis])),
                            valid = a === b;

                        //Update current position while moving
                        if ((direction < 0 && (a < Math.floor(gridPosition(this.position.grid.current[axis])))) || (direction > 0 && (a > Math.floor(gridPosition(this.position.grid.current[axis]))))) {
                            this.position.grid.current[axis] += direction;
                        }

                        if (a >= max) {
                            valid = true;
                            this.position.real[axis] = max;
                            this.position.grid.next[axis] = size;
                        } else if (a <= 0) {
                            valid = true;
                            this.position.real[axis] = 0;
                            this.position.grid.next[axis] = 0;
                        } else {
                            if (direction < 0) {
                                if (a < b) {
                                    valid = true;
                                    this.position.real[axis] = b;
                                    a = b;
                                }
                            } else {
                                if (a > b) {
                                    valid = true;
                                    this.position.real[axis] = b;
                                    a = b;
                                }
                            }
                        }

                        return valid;
                    },
                    finish: function () {
                        this.moving[axis] = false;
                        this.position.grid.current[axis] = this.position.grid.next[axis];

                        this.direction[axis] = 0;

                        if (options && options.finish) {
                            options.finish.call(this);
                        }
                    }
                });
            }
        };

        return {
            x: (function (context) {
                return function (length, options) {
                    move.call(context, "x", length, options);
                };
            }(context)),
            y: (function (context) {
                return function (length, options) {
                    move.call(context, "y", length, options);
                };
            }(context))
        };
    };


    return Mover;
});