define([], function () {
    "use strict";

    function Calculation(context, actionFunc, deleteWhenFunc, finishFunc) {
        this.context = context;
        this.actionFunc = actionFunc;
        this.deleteWhenFunc = deleteWhenFunc;
        this.finishFunc = finishFunc;
    }

    Calculation.prototype.calculate = function () {
        this.actionFunc.call(this.context);
    };

    Calculation.prototype.finish = function () {
        if (this.finishFunc) {
            this.finishFunc.call(this.context);
        }
    };

    Calculation.prototype.readyToBeDeleted = function () {
        return this.deleteWhenFunc.call(this.context);
    };

    function Calculations() {
        this.items = [];
    }

    Calculations.prototype.add = function (context, actionFunc, deleteWhenFunc, finishFunc) {
        this.items.push(new Calculation(context, actionFunc, deleteWhenFunc, finishFunc));
    };

    Calculations.prototype.perform = function () {
        var i, calculation, itemsLength = this.items.length;

        for (i = itemsLength - 1; i >= 0; i -= 1) {
            calculation = this.items[i];

            calculation.calculate();

            if (calculation.readyToBeDeleted()) {
                calculation.finish();
                this.items.splice(i, 1);
            }
        }
    };

    return new Calculations();
})