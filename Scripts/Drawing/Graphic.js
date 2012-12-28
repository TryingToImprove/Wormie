/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:39
 */
define(["Managers/AssetManager"], function (AssetManager) {
    "use strict";

    function Graphic() {
        console.log(this);
        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }
    }

    Graphic.prototype.draw = function () {
        throw new Error("draw() is not implanted");
    };

    Graphic.resources = new AssetManager();

    Graphic.extend = function (childGraphic) {

        var parent = this,
            child,
            prop,
            Surrogate;

        child = function () { parent.apply(this, arguments); };

        for (prop in parent) {
            if (parent.hasOwnProperty(prop)) {
                child[prop] = parent[prop];
            }
        }

        Surrogate = function () { this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        for (prop in childGraphic) {
            if (childGraphic.hasOwnProperty(prop)) {
                child.prototype[prop] = childGraphic[prop];
            }
        }

        child.__super__ = parent.prototype;

        return child;
    };

    return Graphic;
});