/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:44
 */
define(["AppSettings", "Drawing/Graphic"], function (AppSettings, Graphic) {
    "use strict";

    var graphic = Graphic.extend({
        initialize: function (owner) {
            this.owner = owner;
        },
        draw: function (ctx) {
            var owner = this.owner;

            Graphic.resources.getFile(["/Images/happy.png", "/Images/unhappy.png"])
                .then(function (resource, resource2) {
                    console.log(resource, resource2);

                    ctx.drawImage(resource,
                        owner.position.x, owner.position.y,
                        AppSettings.CANVAS.xAxis.width(), AppSettings.CANVAS.yAxis.height()
                    );
                });
        }
    });

    require(["Worm"], function(Worm){
        var worm = new Worm(0,0);
        console.log(worm);
        var a = new graphic(worm);
        a.draw(window.app.canvas.context);
    });

    return graphic;
});