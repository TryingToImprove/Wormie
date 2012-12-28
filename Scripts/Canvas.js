define(["AppSettings"], function (AppSettings) {
    "use strict";

    var createGrid;

    function Canvas(canvas, app) {
        this.canvas = canvas;
        this.app = app;

       //WebGL2D.enable(this.canvas); // adds "webgl-2d" context to cvs

        this.context = this.canvas.getContext("2d");

        this.grid = createGrid();

        AppSettings.vent.subscribe(AppSettings.CANVAS.dimensionChanged, function (data) {
            this.canvas.width = data.CANVAS_WIDTH;
            this.canvas.height = data.CANVAS_HEIGHT;

            Canvas.GRID_SETTINGS.x = data.xAxis;
            Canvas.GRID_SETTINGS.y = data.yAxis;
        }, { context: this });

        this.updateDelta();
    }

    Canvas.prototype.addDrawing = function (objectToDraw, x, y) {
        this.grid[y][x].drawings.push(objectToDraw);
    };

    Canvas.prototype.updateDelta = function () {
        var now = Date.now();
        this.delta = (now - (this.lastTime)) / 1000;
        this.lastTime = now;
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

        this.updateDelta();
        //window.app.save();
    };

    Canvas.GRID_SETTINGS = {
        x: {
            size: 15,
            //ize: 50,
            cachedWidth: null,
            width: function (canvas) {
                var documentWidth;

                if (!this.cachedWidth) {
                    documentWidth = canvas.width;

                    this.cachedWidth =  Math.floor(documentWidth / this.size);
                }

                return this.cachedWidth;
            }
        },
        y: {
            size: 20,
            //size: 50,
            cachedHeight: null,
            height: function (canvas) {
                var documentHeight;

                if (!this.cachedHeight) {
                    documentHeight = canvas.height;

                    this.cachedHeight =  Math.floor(documentHeight / this.size);
                }

                return this.cachedHeight;
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