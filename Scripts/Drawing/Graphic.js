/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:39
 */
define(["Managers/AssetManager"], function (AssetManager) {
    "use strict";

    function Graphic() {
        //Increment the id for making unique hashCodes
        this.instanceOf.id += 1;
        this.uniqueId = this.instanceOf.id;

        this.createdOn = Date.now();

        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }
    }

    Graphic.prototype.getHashCode = function () {
        var hash = 0, i, char, value = this.uniqueId + "#" + this.getType() + "#" + this.createdOn;
        if (value.length !== 0) {
            for (i = 0; i < value.length; i += 1) {
                char = value.charCodeAt(i);
                hash = hash * 31 +  char;
                hash = hash & hash; // Convert to 32bit integer
            }
        }

        return hash;
    };

    Graphic.prototype.draw = function () {
        throw new Error("draw() is not implanted");
    };

    ///STATIC

    Graphic.resources = new AssetManager();

    Graphic.extend = function (name, childGraphic) {

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

        child.id = 0;
        child.prototype.instanceOf = child;
        child.prototype.getType = function () {
            return name;
        }

        child.prototype.__super__ = parent.prototype;

        return child;
    };

    return Graphic;
});