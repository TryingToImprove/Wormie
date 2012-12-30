/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:44
 */
define(["Drawing/Graphic"], function (Graphic) {
    "use strict";

    var App,
        graphic = Graphic.extend("WormGraphic", {
            onClick: function (x, y) {
                var real = this.position.real,
                    validate = function (axis, pos) {
                        var size = (axis === "x") ? App.settings.CANVAS.xAxis.width() : App.settings.CANVAS.yAxis.height();

                        return (pos >= real[axis]) && (pos <= real[axis] + size);
                    };

                if (validate("x", x) && validate("y", y)) {
                    this.clicked();
                }
            },
            initialize: function (owner, position) {
                App = require("App");

                this.owner = owner;
                this.position = position;

                App = require("App");

                App.vent.subscribe("canvas:click", this.onClick, { context: this.owner });
            },
            dispose: function () {
                App.vent.unsubscribe("canvas:click", this.onClick, { context: this.owner });
            },
            spritePosition: 0,
            step: 0,
            draw: function (ctx) {
                var owner = this.owner,
                    position = this.position,
                    spritePosition = this.spritePosition,
                    canvasSettings = App.settings.CANVAS,
                    stepEach = 3,
                    spriteWidth = 18;


                Graphic.resources.getFile("/Images/walkingSprite.png")
                    .then(function (resource) {

                        var posX = 0;

                        ctx.save();

                        var imageHeight = canvasSettings.yAxis.height(),
                            imageWidth =canvasSettings.xAxis.width();

                        ctx.translate(position.x, position.y);

                        if (owner.direction.x > 0) {
                            ctx.scale(-1, 1);
                            posX = -canvasSettings.xAxis.width();
                        }
                        /*
                        if (owner.direction.x === 0){
                            if (owner.direction.y > 0) {
                                var radian = 270 * (Math.PI / 180);

                                ctx.rotate(radian)
                                posX = -canvasSettings.xAxis.width();

                                //var temp = imageWidth;
                                //imageWidth = imageHeight;
                                //imageHeight = temp;

                            } else if (owner.direction.y < 0) {
                                var radian = 90 * (Math.PI / 180);

                                ctx.rotate(radian)
                                posX = -canvasSettings.xAxis.width();
                            }
                        }
                        */

                        ctx.drawImage(resource,
                            this.spritePosition * 18, 0,
                            spriteWidth, 15,
                            posX, 0,
                            imageWidth, imageHeight
                        );

                        ctx.restore();

                        ctx.fillStyle = (owner.eatPercent >= 50) ? "red" : "green";
                        fillRoundedRect.call(ctx,
                            position.x,
                            position.y + canvasSettings.yAxis.height(),
                            ((canvasSettings.xAxis.width() / 100) * (owner.eatPercent)),
                            10,
                            5
                        );

                        this.step += 1;

                        if (this.step % stepEach === 0) {
                            this.spritePosition += 1;
                        }

                        if (this.spritePosition >= 9) {
                            this.spritePosition = 0;
                        }
                    }, this)
                    .run();

            }
        });

    var fillRoundedRect = function(x, y, w, h, r){

        this.beginPath();

        this.moveTo(x+r, y);

        this.lineTo(x+w-r, y);

        this.quadraticCurveTo(x+w, y, x+w, y+r);

        this.lineTo(x+w, y+h-r);

        this.quadraticCurveTo(x+w, y+h, x+w-r, y+h);

        this.lineTo(x+r, y+h);

        this.quadraticCurveTo(x, y+h, x, y+h-r);

        this.lineTo(x, y+r);

        this.quadraticCurveTo(x, y, x+r, y);

        this.fill();

    }

    return graphic;
});