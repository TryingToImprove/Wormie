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

    Canvas.prototype.addDrawing = function (objectToDraw, x, y) {
        this.grid[y][x].drawings.push(objectToDraw);
    };

    Canvas.prototype.draw = function () {

        //Lets us draw the grid;
        var row, col, cell, ctx = this.context,
            rowHeight = Canvas.GRID_SETTINGS.y.height(this.canvas),
            colWidth = Canvas.GRID_SETTINGS.x.width(this.canvas),
            drawing, objectToDraw;

        //Clear
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";

        for (row = 0; row < this.grid.length; row += 1) {
            for (col = 0; col < this.grid[row].length; col += 1) {
                ctx.strokeRect(col * colWidth, row * rowHeight, colWidth, rowHeight);

                for (drawing = 0; drawing < this.grid[row][col].drawings.length; drawing += 1) {
                    objectToDraw = this.grid[row][col].drawings[drawing];
                    objectToDraw.draw.call(objectToDraw, ctx, rowHeight, colWidth);
                }
            }
        }

    };

    Canvas.GRID_SETTINGS = {
        x: {
            size: 10,
            width: function (canvas) {
                var documentWidth = canvas.width;

                return Math.floor(documentWidth / this.size);
            }
        },
        y: {
            size: 20,
            height: function (canvas) {
                var documentHeight = canvas.height;

                return Math.floor(documentHeight / this.size);
            }
        }
    };

    createGrid = function () {
        var grid = [], col, row;

        for (row = 0; row < Canvas.GRID_SETTINGS.y.size; row += 1) {
            grid[row] = [];

            for (col = 0; col < Canvas.GRID_SETTINGS.x.size; col += 1) {
                grid[row][col] = {
                    drawings: []
                };
            }
        }

        return grid;
    };

    return Canvas;
});