define(["AppSettings", "Drawing/SceneList"], function (AppSettings, SceneList) {
    "use strict";

    function Canvas(canvas, app) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.app = app;
        this.scenes = new SceneList();

        AppSettings.vent.subscribe(AppSettings.CANVAS.dimensionChanged, function (data) {
            this.canvas.width = data.CANVAS_WIDTH;
            this.canvas.height = data.CANVAS_HEIGHT;
        }, { context: this });

        this.canvas.addEventListener("mousemove", function (e) {
            AppSettings.vent.publish("mouseOver", e.offsetX, e.offsetY);
        }, false);

        this.updateDelta();
    }

    Canvas.prototype.addDrawing = function (drawable, depth) {
        var scene = this.scenes.elementAt(depth) || this.scenes.create(depth, this);
        scene.add(drawable);
    };

    Canvas.prototype.updateDelta = function () {
        var now = Date.now();
        this.delta = (now - (this.lastTime)) / 1000;
        this.lastTime = now;
    };

    Canvas.prototype.render = function () {
        //Clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Invoke the scenes
        this.scenes.invoke(this, function (scene) {
            scene.render(this.context);
        });

        this.updateDelta();
        //window.app.save();
    };

    return Canvas;
});