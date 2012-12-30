/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 16:44
 */
define(["App", "Drawing/Graphic"], function (App, Graphic) {
    "use strict";

    var graphic = Graphic.extend("GridGraphic", {
        initialize: function () {
            console.log(App)
            App.vent.subscribe("canvas:click", function (x, y) {
                var xCol = App.settings.CANVAS.xAxis.getCol(x),
                    yRow = App.settings.CANVAS.yAxis.getRow(y);

                this.selected = {
                    x: xCol,
                    y: yRow
                };
            }, { context: this });
        },
        draw: function (ctx) {
            var row,
                col,
                canvasSettings = App.settings.CANVAS,
                colWidth = canvasSettings.xAxis.width(),
                rowHeight = canvasSettings.yAxis.height(),
                rowLength = canvasSettings.yAxis.size,
                colLength = canvasSettings.xAxis.size,
                cleanUp = false;

            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";

            for (row = 0; row < rowLength; row += 1) {
                for (col = 0; col < colLength; col += 1) {
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