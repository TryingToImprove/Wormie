define(["AppSettings", "Calculations", "Utilities/Mover", "Drawing/Graphics/WormGraphic"], function (AppSettings, Calculations, Mover, WormGraphic) {
    "use strict";

    function Worm(x, y) { //implants IDrawable
        var posX = Math.floor(Math.random() * AppSettings.CANVAS.xAxis.size),
            posY = Math.floor(Math.random() * AppSettings.CANVAS.yAxis.size);

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

        /*this.lastPosition = {
            x: x,
            y: y
        };*/

    /*    this.mover = new Mover(this, {
            yHeight: AppSettings.CANVAS.yAxis.height(),
            xWidth: AppSettings.CANVAS.xAxis.width()
        });
*/

        this.graphic = new WormGraphic(this, this.position.real);

        this.mover = createMover.call(this);
        this.live();
    }

    var movementSpeed = 80,
        createMover = function () {
            this.moving = {};

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

                    this.position.grid.next[axis] = nextPosition;
                    this.moving[axis] = true;

                    Calculations.add(this, {
                        calculate: function () {
                            var distance = movementSpeed * (this.scene.getCanvas().delta || 1) * direction;
                            this.position.real[axis] += distance;
                        },
                        doneWhen: function () {
                            var a = Math.floor(this.position.real[axis]),
                                b = Math.floor(gridPosition(this.position.grid.next[axis])),
                                valid = a === b;

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
                }(this)),
                y: (function (context) {
                    return function (length, options) {
                        move.call(context, "y", length, options);
                    };
                }(this))
            };
        };

    Worm.prototype.toSaveObject = function () {
        return {
            lastPosition: this.lastPosition,
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

    return Worm;
});