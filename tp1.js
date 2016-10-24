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
        cells[x][y] = 0;
        Grid.colorCell(x, y, 'black');
    } else {
        cells[x][y] = 1;
        Grid.colorCell(x, y, 'darkblue');
    }
};

function step () {
    console.log('step');
};

function randomGrid (percent) {
    console.log('randomGrid ' + percent);
};

function resetGrid () {
    cells = newMatrix(width, height);
    Grid.create(width, height);
};

function resizeGrid (newWidth, newHeight) {
    Grid.create(newWidth, newHeight);

    console.log('resizeGrid ' + newWidth + ' ' + newHeight);
};

Grid.create(width, height); // Créer la grille initiale
