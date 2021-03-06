define(
    ["AppSettings", "Region", "$", "Managers/DataManager", "Drawing/Canvas", "Managers/AssetManager", "AppSettings", "Drawing/Graphics/WormGraphic"],
    function (AppSettings, Region, $, DataManager, Canvas, AssetManager) {
        "use strict";

        var getUser, drawing;

        function App() {
            this.resources = new AssetManager();
            this.dataManager = new DataManager();
            this.vent = AppSettings.vent;
            this.settings = AppSettings;

            this.regions = {
                main: new Region($("#Wormie"))
            };

            this.buildRoutes();
        }

        App.prototype.buildRoutes = function () {
            var that = this;

            this.vent.subscribe("view:show:gameView", function () {
                require(["Views/Game/GameView"], function (GameView) {
                    var gameView = new GameView();

                    that.regions.main.show(gameView);
                });
            });

            this.vent.subscribe("view:show:loginView", function () {
                require(["Views/Login/LoginView"], function (LoginView) {
                    var loginView = new LoginView({ model: { name: "Oliver" } });

                    that.regions.main.show(loginView);
                });
            });
        };

        App.prototype.start = function () {
            var user, name, that = this;

            if (this.dataManager.checkExistence()) {
                this.user =  this.dataManager.load().user;

                this.vent.publish("view:show:gameView");
            } else {
                this.vent.publish("view:show:loginView");
            }

            window.addEventListener("beforeunload", function () {
                //window.app.save();
            }, false);

        };

        App.prototype.save = function (callback) {
            this.dataManager.save(this.user, callback);
        };

        return new App();
    }
);