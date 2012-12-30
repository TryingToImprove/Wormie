require.config({
    basePath: "../Scripts",
    deps: ["Utilities/Assert"],
    shim: {
        Handlebars: {
            exports: "Handlebars"
        },
        Zepto: {
            exports: "Zepto"
        }
    },
    paths: {
        Handlebars: "Vendor/handlebars-1.0.rc.1",
        Zepto: "Vendor/Zepto",
        AppSettings: "Settings/AppSettings",
        text: "Vendor/requirejs-plugins/text",
        Templates: "../Templates"
    }
});

define(["App"], function (App) {
    "use strict";

    window._app = App;

    App.start();
});