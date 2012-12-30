/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 22:14
 */
define(["App", "View", "$", "text!Templates/Login/LoginView.html"], function (App, View, $, viewTemplate) {
    "use strict";

    var ItemView = View.extend({
        template: viewTemplate,
        afterRender: function () {
            $("form", this.$area).on("submit", function () {
                var that = this;

                require(["Factories/UserFactory"], function (UserFactory) {
                    App.user = UserFactory.create($("input[name='txtName']", that.$area).val());
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