/**
 * User: Oliver
 * Date: 29-12-12
 * Time: 17:54
 */
define(["Utilities/LinkedList"], function (LinkedList) {
    "use strict";

    var SceneList = LinkedList.extend({
        initialize: function (canvas) {
            this.canvas = canvas;
            this.lowestDepth = null;
        },
        elementAt: function (depth) {
            var found = false,
                node = this.firstNode;

            while (!found && node) {
                if (node.depth === depth) {
                    found = true;
                } else {
                    node = node.next;
                }
            }

            if (!found || !node) {
                throw new Error("Element was not found");
            }

            return node.data;
        },
        add: function (depth, scene) {

            var node = {
                depth: depth,
                data: scene,
                prev: null,
                next: null
            }, lowest = false;

            if (!this.lowestDepth || this.lowestDepth > depth) {
                this.lowestDepth = depth;
                lowest = true;
            }

            if (!this.firstNode) {

                this.firstNode = node;
                this.lastNode = node;

                node.prev = this.firstNode;
            } else {

                if (lowest) {

                    node.next = this.firstNode;
                    node.prev = node;

                    this.firstNode = node;

                } else {
                    var keepRunning = true,
                        node = this.firstNode;

                    while (keepRunning) {
                        if (node.depth > depth) {
                            var prevNode = node.prev,
                                current = node,
                                newNode = {
                                    depth: depth,
                                    data: scene,
                                    prev: prevNode,
                                    next: current
                                };

                            node.prev.next = newNode;
                            node.prev = newNode;

                            this.length += 1;

                            keepRunning = false;

                        } else {
                            if (!node.next) {
                                node.next = {
                                    depth: depth,
                                    data: scene,
                                    prev: node,
                                    next: null
                                };

                                this.lastNode = node.next;

                                this.length += 1;

                                keepRunning = false;
                            } else {

                                node = node.next;
                            }
                        }
                    }
                }
            }
        },
        invoke: function (context, func) {
            var scene = this.firstNode;
            while (scene) {
                func.call(context, scene.data);
                scene = scene.next;
            }
        }
    });

    return SceneList;
});