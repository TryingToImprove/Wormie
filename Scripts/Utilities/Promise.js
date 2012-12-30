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

        this.reject = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, 'reject');

            self.complete.apply(this, args);
        };
    }

    Promise.prototype = {
        resolve: function () {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, 'resolve');

            this.complete.apply(this, args);
        },

        startWith: function (success) {
            this.startFunc = success;
        },

        then: function (success, context) {
            this.pending.push({ resolve: success, context: context });
            return this;
        },

        complete: function () {
            var args = Array.prototype.slice.call(arguments, 0),
                type = args[0];

            args.splice(0, 1);

            while (this.pending[0]) {
                var func = this.pending.shift();

                func[type].apply(func.context || this, args);
            }
        },

        run: function () {
            this.startFunc();
        }
    };

    return Promise;
});