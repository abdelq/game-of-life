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
    console.log('changeState ' + x + ' ' + y);
};

function step () {
    console.log('step');
};

function randomGrid (percent) {
    console.log('randomGrid ' + percent);
};

function resetGrid () {
    console.log('resetGrid');
};

function resizeGrid (newWidth, newHeight) {
    Grid.create(newWidth, newHeight);

    console.log('resizeGrid ' + newWidth + ' ' + newHeight);
};

Grid.create(40, 40); // Créer la grille initiale
