define(["App"], function (App) {
    "use strict";

    require.config({
        basePath: "../Scripts"
    });

    var app = new App(document.getElementById("game-canvas"));

    app.start();

});