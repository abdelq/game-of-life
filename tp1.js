// État de la grille
var width = 40, height = 40;
var cells = newMatrix(width, height);

function newMatrix (rows, cols) {
    var arr = [];

    for (var i = 0; i < rows; i += 1) {
        arr[i] = [];

        for (var j = 0; j < cols; j += 1) {
            arr[i][j] = 0;
        }
    }

    return arr;
};

function changeState (x, y) {
    if (cells[x][y]) {
        Grid.colorCell(x, y, 'black');
        cells[x][y] = 0;
    } else {
        Grid.colorCell(x, y, 'darkblue');
        cells[x][y] = 1;
    }
};

function step () {
    console.log('step');
};

function randomGrid (percent) {
    console.log('randomGrid ' + percent);
};

function resetGrid () {
    Grid.create(width, height);
    cells = newMatrix(width, height);
};

function resizeGrid (newWidth, newHeight) {
    Grid.create(newWidth, newHeight);

    cells.length = newWidth;

    for (var i = 0; i < cells.length; i += 1) {
        if (!cells[i])
            cells[i] = [];

        cells[i].length = newHeight;

        for (var j = 0; j < cells[i].length; j += 1) {
            if (!cells[i][j])
                cells[i][j] = 0;
            else if (cells[i][j] == 1)
                Grid.colorCell(i, j, 'darkblue');
        }
    }
};

Grid.create(width, height); // Créer la grille initiale
