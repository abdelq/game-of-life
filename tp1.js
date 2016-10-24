// État de la grille
// Note : ne modifiez pas ces noms de variables
var width = 40, height = 40;
var cells = []; // Besoin d'un tableau 2D de 40x40 ici pour gérer la grille

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

// Crée la grille initiale
Grid.create(40,40);
