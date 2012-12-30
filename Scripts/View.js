/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 21:21
 */
define(["Handlebars", "Zepto"], function (Handlebars, $) {
    "use strict";

    function View(options) {
        this.model = (options && options.model) ? options.model : null;
    }

    View.prototype.render = function () {
        var compiledTemplate = Handlebars.compile(this.template),
            result = compiledTemplate(this.model);

        return result;
    };

    View.prototype.dispose = function () {
        console.error("Your view should contain a dispose method");
    };

    View.extend = function (childView) {
        var parent = this,
            child,
            prop,
            Surrogate;

        child = function () { parent.apply(this, arguments); };

        Surrogate = function () { this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        for (prop in childView) {
            if (childView.hasOwnProperty(prop)) {
                child.prototype[prop] = childView[prop];
            }
        }

        child.prototype.__super__ = parent.prototype;

        return child;
    };

    return View;
});