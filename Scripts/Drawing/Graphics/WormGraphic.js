/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:44
 */
define(["AppSettings", "Drawing/Graphic", "Utilities/Promise"], function (AppSettings, Graphic) {
    "use strict";

    var graphic = Graphic.extend("WormGraphic", {
        initialize: function (owner, position) {
            this.owner = owner;
            this.position = position;
        },
        draw: function (ctx) {
            var owner = this.owner,
                position = this.position;

            Graphic.resources.getFile("/Images/" + owner.state + ".png")
                .then(function (resource) {
                    ctx.drawImage(resource,
                        position.x, position.y,
                        AppSettings.CANVAS.xAxis.width(), AppSettings.CANVAS.yAxis.height()
                        );
                })
                .run();
        }
    });


     return graphic;
});