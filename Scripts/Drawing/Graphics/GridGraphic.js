/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:44
 */
define(["AppSettings", "Drawing/Graphic"], function (AppSettings, Graphic) {
    "use strict";

    var graphic = Graphic.extend("GridGraphic", {
        initialize: function () {
            AppSettings.vent.subscribe("canvas:click", function (x, y) {
                var xCol = AppSettings.CANVAS.xAxis.getCol(x),
                    yRow = AppSettings.CANVAS.yAxis.getRow(y);

                this.selected = {
                    x: xCol,
                    y: yRow
                };
            }, { context: this });
        },
        draw: function (ctx) {
            var row, col, rowHeight = AppSettings.CANVAS.yAxis.height(), colWidth = AppSettings.CANVAS.xAxis.width();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";

            var cleanUp = false;

            for (row = 0; row < AppSettings.CANVAS.yAxis.size; row += 1) {
                for (col = 0; col < AppSettings.CANVAS.xAxis.size; col += 1) {
                    if (this.selected) {
                        if (this.selected.x === col && this.selected.y === row) {
                            ctx.strokeStyle = "red";
                            ctx.fillStyle = "red";
                            cleanUp = true;
                        }
                    }

                    ctx.strokeRect(col * colWidth, row * rowHeight, colWidth, rowHeight);

                    if (cleanUp) {
                        ctx.fillRect(col * colWidth, row * rowHeight, colWidth, rowHeight);
                        ctx.fillStyle = "black";
                        ctx.strokeStyle = "black";
                        cleanUp = false;
                    }
                }
            }
        }
    });


     return graphic;
});