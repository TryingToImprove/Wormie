/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 15:20
 */
define(function () {
    "use strict";

    var dimensionChanged = "canvas:dimensions:change";

    function CanvasSettings(eventManager) {
        this.vent = eventManager;

        window.addEventListener("resize", (function (context) {
            return function (e) {
                context.calculateDimensions.call(context, e);
            };
        }(this)), false);

        this.CANVAS_WIDTH = null;
        this.CANVAS_HEIGHT = null;

        this.dimensionChanged = dimensionChanged;

        this.xAxis = {
            size: 15,
            cachedWidth: null,
            width: function () {
                if (!this.cachedWidth) {
                    this.calculate();
                }

                return this.cachedWidth;
            },
            calculate: function (canvasWidth) {
                this.cachedWidth =  Math.floor(canvasWidth / this.size);
            },
            get: function (pos) {
                return this.width() * pos;
            },
            max: function () {
                return this.width() * (this.size - 1);
            }
        };

        this.yAxis = {
            size: 20,
            cachedHeight: null,
            height: function (canvas) {
                if (!this.cachedHeight) {
                    this.calculate();
                }

                return this.cachedHeight;
            },
            calculate: function (canvasHeight) {
                this.cachedHeight =  Math.floor(canvasHeight / this.size);
            },
            get: function (pos) {
                return this.height() * pos;
            },
            max: function () {
                return this.height() * (this.size - 1);
            }
        };

        this.calculateDimensions();
    }

    CanvasSettings.prototype.calculateDimensions = function (e) {
        function width() {
            var widthPercent = 100,
                documentWidth = window.innerWidth;

            return (documentWidth / 100) * widthPercent;
        }

        function height() {
            var heightPercent = 90,
                documentHeight = window.innerHeight;

            return (documentHeight / 100) * heightPercent;
        }

        this.CANVAS_WIDTH = width();
        this.CANVAS_HEIGHT = height();

        this.xAxis.calculate(this.CANVAS_WIDTH);
        this.yAxis.calculate(this.CANVAS_HEIGHT);

        this.vent.publish("canvas:dimensions:change", {
            CANVAS_WIDTH: this.CANVAS_WIDTH,
            CANVAS_HEIGHT: this.CANVAS_HEIGHT,
            xAxis: this.xAxis,
            yAxis: this.yAxis
        });
    };

    return CanvasSettings;
});