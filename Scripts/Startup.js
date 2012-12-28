define(["App"], function (App) {
    "use strict";

    require.config({
        basePath: "../Scripts",
        deps: ["Assert"]
    });


    var canvas = document.getElementById("game-canvas"), app;

    window.app = app = new App(canvas);
    app.start();
});