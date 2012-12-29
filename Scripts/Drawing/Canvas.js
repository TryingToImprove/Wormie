define(["AppSettings", "Drawing/SceneList", "Drawing/Scene"], function (AppSettings, SceneList, Scene) {
    "use strict";

    function Canvas(canvas, app) {
        this.canvas = canvas;
        this.app = app;

        this.scenes = new SceneList();

        this.context = this.canvas.getContext("2d");

        AppSettings.vent.subscribe(AppSettings.CANVAS.dimensionChanged, function (data) {
            this.canvas.width = data.CANVAS_WIDTH;
            this.canvas.height = data.CANVAS_HEIGHT;
        }, { context: this });

        this.updateDelta();
    }

    Canvas.prototype.addDrawing = function (graphic, depth) {
        var scene;

        try {
            scene = this.scenes.elementAt(depth);
        } catch (e) {
            scene = new Scene(this);
            this.scenes.add(depth, scene);
        }

        scene.add(graphic);
    };

    Canvas.prototype.updateDelta = function () {
        var now = Date.now();
        this.delta = (now - (this.lastTime)) / 1000;
        this.lastTime = now;
    };

    Canvas.prototype.draw = function () {
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