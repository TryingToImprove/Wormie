/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 17:21
 */
define(function () {
    "use strict";

    function Scene(canvas) {
        this.setCanvas(canvas);
        this.drawables = {};
    }

    Scene.prototype.setCanvas = function (canvas) {
        this.canvas = canvas;
    };

    Scene.prototype.getCanvas = function () {
        return this.canvas;
    };

    Scene.prototype.render = function (ctx) {
        var prop;

        for (prop in this.drawables) {
            if (this.drawables.hasOwnProperty(prop)) {
                this.drawables[prop].graphic.draw(ctx);
            }
        }
    };

    Scene.prototype.add = function (drawable) {
        drawable.scene = this;
        this.drawables[drawable.graphic.getHashCode()] = drawable;
    };

    Scene.prototype.remove = function (drawable) {
        drawable.graphic.dispose();

        delete this.drawables[drawable.graphic.getHashCode()];
        drawable = undefined;
    };

    Scene.prototype.dispose = function () {
        delete this.canvas;
        delete this.drawables;
    };

    return Scene;
});