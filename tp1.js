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

var changeState = function(x, y) {
    console.log('changeState ' + x + ' ' + y);
};

var step = function() {
    console.log('step');
};

var randomGrid = function(percent) {
    console.log('randomGrid ' + percent);
};

var resetGrid = function() {
    console.log('resetGrid');
};

var resizeGrid = function(newWidth, newHeight) {
    Grid.create(newWidth, newHeight);

    console.log('resizeGrid ' + newWidth + ' ' + newHeight);
};

Grid.create(40, 40); // Créer la grille initiale
