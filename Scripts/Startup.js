require.config({
    basePath: "../Scripts",
    deps: ["Assert"],
    paths: {
        AppSettings: "Settings/AppSettings"
    }
});

define(["App"], function (App) {
    "use strict";

    var canvas = document.getElementById("game-canvas"), app;

    window.app = app = new App(canvas);
    app.start();
});