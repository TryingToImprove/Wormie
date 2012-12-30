/**
 * User: Oliver
 * Date: 30-12-12
 * Time: 16:14
 */
define(function () {
    "use strict";

    var getRandom = function (arr) {
        var number = Math.floor(Math.random() * arr.length);

        return arr[number];
    };

    function NameFactory() {
        this.LAST_NAMES = ["Miller", "Stein", "Avery", "Kaczmarsk", "DeForest", "Meyer-Love", "Fannon", "Hopkins", "Godstone", "Boyd", "Rienhart", "Wilson", "Lee", "Albano", "Riebow", "Gellman", "Draper", "Touchstone", "Zimmerman", "Jenkins", "Mazor", "Feeney", "McGarvey", "Livingston", "Hughes", "Ryans", "Andrews", "Winters", "Thomason"];
        this.FIRST_NAMES = ["Oliver", "Kim", "Lars", "Mogens", "Micheal", "Melanie", "Lisette", "Daniel", "Thomas", "Søren", "Lone", "Sarah", "Louise", "Simone"]
    }

    NameFactory.prototype.getRandomFirstName = function () {
        return getRandom(this.FIRST_NAMES);
    };

    NameFactory.prototype.getRandomLastName = function () {
        return getRandom(this.LAST_NAMES);
    };

    NameFactory.prototype.createFullName = function () {
        return this.getRandomFirstName() + " " + this.getRandomLastName();
    };

    return new NameFactory();
});