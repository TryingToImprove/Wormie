/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 17:21
 */
define(function () {
    "use strict";

    function Scene() {
        this.graphics = {};
    }

    Scene.prototype.setCanvas = function (canvas) {
        this.canvas = canvas;
    };

    Scene.prototype.getCanvas = function () {
        return this.canvas;
    };

    Scene.prototype.render = function (ctx) {
        var prop;

        for (prop in this.graphics) {
            if (this.graphics.hasOwnProperty(prop)) {
                this.graphics[prop].draw(ctx);
            }
        }
    };

    Scene.prototype.add = function (graphic) {
        this.graphics[graphic.getHashCode()] = graphic;
    };

    Scene.prototype.remove = function (graphic) {
        delete this.graphics[graphic.getHashCode()];
    };

    Scene.prototype.dispose = function () {
        delete this.canvas;
        delete this.graphics;
    };

    return Scene;
});