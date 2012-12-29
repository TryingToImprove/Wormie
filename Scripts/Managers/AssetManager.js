define(["Utilities/Promise", "Vendor/EventManager"], function (Promise, EventManager) {
    "use strict";

    var finishLoading;

    function AssetManager() {
        this.files = [];
        this.queuedFiles = [];

        this.successCount = 0;

        this.cache = {};
        this.loading = {};
        this.vent = new EventManager(this);
    }

    AssetManager.prototype.getFile = function (path) {
        var promise = new Promise(), image, length, file, i, completed = 0, that = this, results = [];

        promise.startWith(function () {
            function loadComplete(path, image) {
                return function (e) {
                    if (image) {
                        that.cache[path] = image;
                        that.vent.publish("loaded:" + path);
                    }

                    results.push(that.cache[path]);

                    completed += 1;

                    if (length === completed) {
                        promise.resolve.apply(promise, results);
                    }
                };
            }

            function waitForLoad() {
                that.vent.unsubscribe("loaded:" + path, waitForLoad);
                loadComplete(path)();
            }

            if (!Array.isArray(path)) {
                path = [path];
            }

            length = path.length;

            for (i = 0; i < length; i += 1) {
                file = path[file];


                if (that.cache[path]) {
                    loadComplete(path)();
                } else if (that.loading[path]) {
                    that.vent.subscribe("loaded:" + path, waitForLoad);
                } else {
                    that.loading[path] = true;

                    image = new Image();
                    image.addEventListener("load", loadComplete(path, image));
                    image.src = path[i];
                }
            }
        });

        return promise;
    };

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