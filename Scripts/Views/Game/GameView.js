/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 22:14
 */
define(["App", "View", "Zepto", "text!Templates/Game/GameView.html", "Drawing/Canvas", "Calculations"], function (App, View, $, viewTemplate, Canvas, Calculations) {
    "use strict";

    var ItemView = View.extend({
        template: viewTemplate,
        afterRender: function () {
            this.canvas = new Canvas($("#game-canvas")[0], $(window).width(), ($(window).height() / 100) * 90.8);

            var that = this, i;

            require(["Drawing/Graphics/GridGraphic"], function (GridGraphic) {
                var worms = App.user.getWorms();

                for (i = 0; i < worms.length; i += 1) {
                    that.canvas.addDrawing(worms[i], 1);
                }

                that.canvas.addDrawing({
                    graphic: new GridGraphic()
                }, 50);

                drawing(that);
            });

        }
    });

    function drawing(context) {
        webkitRequestAnimationFrame(function () {

            Calculations.perform();

            context.canvas.render();

            //context.user.save();

            drawing(context);
        });
    };

    return ItemView;
});