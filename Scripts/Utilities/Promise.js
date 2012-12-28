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

        this.resolve = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, 'resolve');

            self.complete.apply(this, args);
        };

        this.reject = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, 'reject');

            self.complete.apply(this, args);
        };
    }

    Promise.prototype = {
        then: function (success, failure) {
            this.pending.push({ resolve: success, reject: failure });
            return this;
        },

        complete: function () {
            var args = Array.prototype.slice.call(arguments, 0),
                type = args[0];

            args.splice(0, 1);

            while (this.pending[0]) {
                this.pending.shift()[type].apply(this, args);
            }
        }
    };

    return Promise;
});