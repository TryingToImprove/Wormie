define([], function () {
    "use strict";

    var createGrid;

    function Canvas(canvas, width, height) {
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;

        this.context = this.canvas.getContext("2d");

        this.grid = createGrid();
    }

    Canvas.prototype.draw = function () {

        //Lets us draw the grid;
        var row, col, cell, ctx = this.context,
            rowHeight = Canvas.GRID_SETTINGS.y.height(this.canvas),
            colWidth = Canvas.GRID_SETTINGS.x.width(this.canvas);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";

        for (row = 0; row < this.grid.length; row += 1) {
            for (col = 0; col < this.grid[row].length; col += 1) {
                ctx.strokeRect(col * colWidth, row * rowHeight, colWidth, rowHeight);
            }
        }

    };

    Canvas.GRID_SETTINGS = {
        x: {
            size: 10,
            width: function (canvas) {
                var documentWidth = canvas.offsetWidth;


                return Math.ceil(documentWidth / this.size);
            }
        },
        y: {
            size: 20,
            height: function (canvas) {
                var documentHeight = canvas.offsetHeight;

                return documentHeight / this.size;
            }
        }
    };

    createGrid = function () {
        var grid = [], col, row;

        for (row = 0; row < Canvas.GRID_SETTINGS.y.size; row += 1) {
            grid[row] = [];

            for (col = 0; col < Canvas.GRID_SETTINGS.x.size; col += 1) {
                grid[row][col] = {};
            }
        }

        return grid;
    };

    return Canvas;
});