/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 20:56
 */
define(["AppSettings", "Factories/UserFactory"], function (AppSettings, UserFactory) {
    "use strict";

    var DEFAULT_STORAGE_NAME = "WormieApp";

    function DataManager() {

    }

    DataManager.prototype.save = function (user, callback) {
        var data = {
            lastSave: Date.now(),
            user: UserFactory.stringify(user)
        };

        //localStorage.setItem(DEFAULT_STORAGE_NAME, JSON.stringify(data));

        if (callback) {
            callback();
        }
    };

    DataManager.prototype.load = function () {
        var data = JSON.parse(localStorage.getItem(DEFAULT_STORAGE_NAME)),
            user = UserFactory.create(data.user);

        return {
            lastSave: data.lastSave,
            user: user
        };
    };

    DataManager.prototype.checkExistence = function () {
        return !!localStorage.getItem(DEFAULT_STORAGE_NAME);
    };

    return DataManager;
});