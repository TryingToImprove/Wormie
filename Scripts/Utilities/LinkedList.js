/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 17:51
 */
define(function () {
    "use strict";

    function LinkedList() {
        this.firstNode = null;
        this.lastNode = null;
        this.length = 0;
    }

    LinkedList.prototype.add = function (obj) {
        var node;

        //Check if there is a object to add.
        if (!obj) {
            return false;
        }

        //Create a node
        node = {
            data: obj,
            prev: null,
            next: null
        };

        //Check if there NOT is a first node
        if (!this.firstNode) {
            //Make it the only node
            this.firstNode = node;
            this.lastNode = node;
        } else { //Otherwise set the node to the end
            this.lastNode.next = node;
            node.prev = this.lastNode;
            this.lastNode = node;
        }

        //Increment length by 1
        this.length += 1;

        return true;
    };

    LinkedList.prototype.remove = function (node) {
        if (!node) {
            return false;
        }

        if (!node.prev) {
            this.firstNode = node.next;
            if (this.firstNode) {
                this.firstNode.prev = null;
            }
        } else {
            node.prev.next = node.next;
        }

        //Decrement length by 1
        this.length -= 1;

        return true;
    };

    LinkedList.extend = function (childList) {
        var parent = this,
            child,
            prop,
            Surrogate;

        child = function () { parent.apply(this, arguments); };

        Surrogate = function () { this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        for (prop in childList) {
            if (childList.hasOwnProperty(prop)) {
                child.prototype[prop] = childList[prop];
            }
        }

        child.prototype.__super__ = parent.prototype;

        return child;
    };

    return LinkedList;
});