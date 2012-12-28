/**
 * User: Oliver
 * Date: 28-12-12
 * Time: 17:23
 */
define(function () {
    "use strict";

    function Promise() {
        var self = this;
        this.pending = [];

        this.resolve = function (result) {
            self.complete('resolve', result);
        };

        this.reject = function (result) {
            self.complete('reject', result);
        };
    }

    Promise.prototype = {
        then: function (success, failure) {
            this.pending.push({ resolve: success, reject: failure });
            return this;
        },

        complete: function (type, result) {
            while (this.pending[0]) {
                this.pending.shift()[type](result);
            }
        }
    };

    return Promise;
});