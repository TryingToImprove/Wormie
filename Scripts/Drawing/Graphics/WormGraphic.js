/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:44
 */
define(["AppSettings", "Drawing/Graphic", "Utilities/Promise"], function (AppSettings, Graphic) {
    "use strict";

    var graphic = Graphic.extend("WormGraphic", {
        initialize: function (owner) {
            this.owner = owner;
        },
        draw: function (ctx) {
            var owner = this.owner;

            Graphic.resources.getFile("/Images/" + owner.state + ".png")
                .then(function (resource) {
                    ctx.drawImage(resource,
                        owner.position.x, owner.position.y,
                        AppSettings.CANVAS.xAxis.width(), AppSettings.CANVAS.yAxis.height()
                        );
                })
                .run();
        }
    });


     return graphic;
});