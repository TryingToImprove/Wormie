/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 22:22
 */
define(["$"], function ($) {
    "use strict";

    function Region(area) {
        this.$area = $(area);
        this.currentView = null;
    }

    Region.prototype.hide = function () {
        this.currentView.dispose();
        this.$area.html("");
        delete this.currentView;
    };

    Region.prototype.show = function (view) {
        var html;

        if (this.currentView) {
            this.hide();
        }

        this.currentView = view;

        this.$area.html(this.currentView.render());
        this.currentView.afterRender();
    };

    return Region;
});