/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 15:04
 */
define(["Vendor/EventManager", "Settings/CanvasSettings"], function (EventManager, CanvasSettings) {
    "use strict";


    var eventManager = new EventManager(), AppSettings,
        canvasSettings = new CanvasSettings(eventManager);

    AppSettings = window.settings = {
        vent: eventManager,
        CANVAS: canvasSettings,
        WORMS: {
            eatingTime: 10000
        }
    };

    return AppSettings;
});