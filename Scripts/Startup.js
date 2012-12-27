define(["App"], function (App) {
    "use strict";

    require.config({
        basePath: "../Scripts"
    });

    var canvas = document.getElementById("game-canvas"),
        app = new App(canvas);

    app.start();

});