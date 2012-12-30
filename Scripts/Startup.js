require.config({
    basePath: "../Scripts",
    deps: ["Utilities/Assert"],
    shim: {
        Handlebars: {
            exports: "Handlebars"
        },
        $: {
            exports: "jQuery"
        }
    },
    paths: {
        Handlebars: "Vendor/handlebars-1.0.rc.1",
        $: "Vendor/jquery.mobile-1.2.0",
        AppSettings: "Settings/AppSettings",
        text: "Vendor/requirejs-plugins/text",
        Templates: "../Templates"
    }
});

define(["App"], function (App) {
    "use strict";

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());

    window._app = App;

    App.start();
});