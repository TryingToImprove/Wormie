define([], function () {
    "use strict";

    var finishLoading;

    function AssetManager() {
        this.files = [];
        this.queuedFiles = [];

        this.successCount = 0;
    }

    AssetManager.prototype.queueDownload = function (path) {
        this.queuedFiles.push({
            path: path
        });
    };

    AssetManager.prototype.signalDone = function (callback) {
        if (0 === this.queuedFiles.length) {
            if (callback) { callback(); }
        }
    };

    AssetManager.prototype.download = function (callback) {
        var i, length = this.queuedFiles.length, queuedItem, image, that = this;

        for (i = length - 1; i >= 0; i -= 1) {
            queuedItem = this.queuedFiles[i];

            image = new Image();
            image.addEventListener("load", finishLoading(this, queuedItem.path, callback, i));
            image.src = queuedItem.path;
        }
    };

    finishLoading = function(context, path, callback, position) {
        return function (e) {
            context.files[path] = this;

            context.queuedFiles.splice(position, 1);

            context.signalDone(callback);
        };
    };

    return AssetManager;
});