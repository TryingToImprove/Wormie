/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 22:14
 */
define(["App", "View", "Zepto", "text!Templates/Login/LoginView.html"], function (App, View, $, viewTemplate) {
    "use strict";

    var ItemView = View.extend({
        template: viewTemplate,
        afterRender: function () {
            $("form", this.$area).on("submit", function () {
                var that = this;

                require(["User"], function (User) {
                    App.user = new User($("input[name='txtName']", that.$area).val())
                    App.save(function () {
                        App.vent.publish("view:show:gameView");
                    });
                });

                return false;
            });
        }
    });

    return ItemView;
});