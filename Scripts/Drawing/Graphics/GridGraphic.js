/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:44
 */
define(["AppSettings", "Drawing/Graphic"], function (AppSettings, Graphic) {
    "use strict";

    var graphic = Graphic.extend("GridGraphic", {
        initialize: function () {
        },
        draw: function (ctx) {
            var row, col, rowHeight = AppSettings.CANVAS.yAxis.height(), colWidth = AppSettings.CANVAS.xAxis.width();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";

            for (row = 0; row < AppSettings.CANVAS.yAxis.size; row += 1) {
                for (col = 0; col < AppSettings.CANVAS.xAxis.size; col += 1) {
                    ctx.strokeRect(col * colWidth, row * rowHeight, colWidth, rowHeight);
                }
            }
        }
    });


     return graphic;
});