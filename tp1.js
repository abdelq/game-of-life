/**
 *  @fileOverview IFT1015 - TP1: Conway's Game of Life
 *
 *  @author Abdelhakim Qbaich
 *  @author Marc Poulin
 */

/**
 * Crée une matrice remplie de zéros.
 *
 * @param {number} rows - Nombre de lignes
 * @param {number} cols - Nombre de colonnes
 */
function array2D(rows, cols) {
  const row = [];
  while (cols--) {
    row.push(0);
  }

  const arr = [];
  while (rows--) {
    arr.push(row.slice());
  }

  return arr;
}

// Matrice/Grille et ses dimensions
let width = 40;
let height = 40;
let cells = array2D(width, height);

/**
 * Fait naître une cellule.
 *
 * @param {object} arr - Matrice à modifier
 * @param {number} x - Position selon l'axe des x
 * @param {number} y - Position selon l'axe des y
 */
function setAlive(arr, x, y) {
  arr[x][y] = 1;
  Grid.colorCell(x, y, 'darkblue');
}

/**
 * Tue une cellule.
 *
 * @param {object} arr - Matrice à modifier
 * @param {number} x - Position selon l'axe des x
 * @param {number} y - Position selon l'axe des y
 */
function setDead(arr, x, y) {
  arr[x][y] = 0;
  Grid.colorCell(x, y, 'black');
}

/**
 * Change l'état d'une cellule, de vivante à morte et vice-versa.
 */
function changeState(x, y) {
  cells[x][y] ? setDead(cells, x, y) : setAlive(cells, x, y);
}

/**
 * Calcule le nombre de voisins vivants à proximité d'une cellule.
 *
 * @param {number} x - Position selon l'axe des x
 * @param {number} y - Position selon l'axe des y
 */
function aliveNeighbors(x, y) {
  const top = (y - 1 >= 0) ? y - 1 : height - 1;
  const bottom = (y + 1 < height) ? y + 1 : 0;
  const left = (x - 1 >= 0) ? x - 1 : width - 1;
  const right = (x + 1 < width) ? x + 1 : 0;

  return cells[left][top] +
    cells[left][y] +
    cells[left][bottom] +
    cells[right][top] +
    cells[right][y] +
    cells[right][bottom] +
    cells[x][top] +
    cells[x][bottom];
}

/**
 * Représente un "pas" de l'évolution du jeu.
 */
function step() {
  const nextCells = array2D(width, height);

  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      const neighbors = aliveNeighbors(i, j);

      if (cells[i][j]) {
        if (neighbors < 2 || neighbors > 3) {
          // Sous-population/Sur-population
          setDead(nextCells, i, j);
        } else {
          setAlive(nextCells, i, j);
        }
      } else if (neighbors === 3) {
        // Reproduction
        setAlive(nextCells, i, j);
      }
    }
  }

  cells = nextCells;
}

/**
 * Remplit la grille avec une densité aléatoire d’un certain pourcentage.
 */
function randomGrid(percent) {
  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      if (Math.random() * 100 < percent) {
        setAlive(cells, i, j);
      } else if (cells[i][j]) {
        setDead(cells, i, j);
      }
    }
  }
}

/**
 * Vide la grille de toutes ses cellules vivantes.
 */
function resetGrid() {
  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      if (cells[i][j]) {
        setDead(cells, i, j);
      }
    }
  }
}

/**
 * Redimensionne la grille.
 */
function resizeGrid(newWidth, newHeight) {
  width = newWidth; height = newHeight;

  cells.length = width; // Redimensionner en x
  for (let i = 0; i < cells.length; i += 1) {
    if (!cells[i]) {
      cells[i] = [];
    }

    cells[i].length = height; // Redimensionner en y
    for (let j = 0; j < cells[i].length; j += 1) {
      if (!cells[i][j]) {
        cells[i][j] = 0;
      }
    }
  }

  Grid.create(height, width);
  colorGrid();
}

/**
 * Colorie la grille.
 */
function colorGrid() {
  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      if (cells[i][j]) {
        Grid.colorCell(i, j, 'darkblue');
      } else {
        Grid.colorCell(i, j, 'black');
      }
    }
  }
}

Grid.create(height, width);

/**
 * Tests unitaires.
 */
function test() {
  // Matrice/Grille et ses dimensions, avant les tests
  const originalWidth = width;
  const originalHeight = height;
  const originalCells = cells;

  // array2D
  const dim = [
    [1, 1],
    [49, 51],
    [100, 100],
  ];

  for (let i = 0; i < dim; i += 1) {
    const arr = array2D(dim[0], dim[1]);

    console.assert(arr.length === dim[0], 'La matrice créée n\'a pas le bon nombre de lignes');
    console.assert(arr[0].length === dim[1], 'La matrice créée n\'a pas le bon nombre de colonnes');
    console.assert(arr[0][0] === 0, 'La matrice créée contient autre chose que des zéros');
  }

  // setAlive
  const deadArray = [[0]];

  setAlive(deadArray, 0, 0);
  console.assert(deadArray[0][0] === 1, 'La cellule n\'est pas née');

  // setDead
  const aliveArray = [[1]];

  setDead(aliveArray, 0, 0);
  console.assert(aliveArray[0][0] === 0, 'La cellule n\'est pas tuée');

  // changeState
  cells = [[0]];
  width = 1; height = 1;

  changeState(0, 0);
  console.assert(cells[0][0] === 1, 'La cellule n\'a pas changé d\'état (morte à vivante)');
  changeState(0, 0);
  console.assert(cells[0][0] === 0, 'La cellule n\'a pas changé d\'état (vivante à morte)');

  // aliveNeighbors
  cells = [
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
  ];
  width = 5; height = 5;

  console.assert(aliveNeighbors(2, 2) === 8, 'La cellule ne contient pas le bon nombre de voisins (cas sans "warp")');
  console.assert(aliveNeighbors(0, 0) === 4, 'La cellule ne contient pas le bon nombre de voisins (cas avec "warp")');

  // step
  cells = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 0, 'La sous-population n\'a pas tué la cellule');

  cells = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 0, 'La sur-population n\'a pas tué la cellule');

  cells = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 1, 'La cellule n\'est pas restée en vie (cas avec 2 voisins vivants)');

  cells = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 1, 'La cellule n\'est pas restée en vie (cas avec 3 voisins vivants)');

  cells = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 1, 'La reproduction n\'a pas eu lieu');

  cells = [
    [0, 0, 0],
    [1, 0, 1],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 0, 'La reproduction a eu lieu');

  // randomGrid
  cells = array2D(10, 10);
  width = 10; height = 10;

  let aliveCells = 0;
  randomGrid(50);

  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      if (cells[i][j]) {
        aliveCells += 1;
      }
    }
  }

  console.assert(aliveCells > 40, 'Le nombre de cellules en vie de façon aléatoire est trop petit');
  console.assert(aliveCells < 60, 'Le nombre de cellules en vie de façon aléatoire est trop grand');

  // resetGrid
  cells = [
    [1, 1],
    [1, 1],
  ];
  width = 2; height = 2;

  resetGrid();
  console.assert(cells == '0,0,0,0', 'La matrice n\'a pas été réinitialisée');

  // resizeGrid
  cells = [[1]];
  width = 1; height = 1;

  resizeGrid(2, 2);
  console.assert(cells.length === 2, 'La matrice agrandie n\'a pas le bon nombre de lignes');
  console.assert(cells[0].length === 2, 'La matrice agrandie n\'a pas le bon nombre de colonnes');
  console.assert(width === 2 && height === 2, 'Les dimensions de la grille ne sont pas les bonnes (agrandissement)');
  console.assert(cells == '1,0,0,0', 'Le contenu de la matrice agrandie n\'est pas le bon');

  resizeGrid(1, 1);
  console.assert(cells.length === 1, 'La matrice rapetissée n\'a pas le bon nombre de lignes');
  console.assert(cells[0].length === 1, 'La matrice rapetissée n\'a pas le bon nombre de colonnes');
  console.assert(width === 1 && height === 1, 'Les dimensions de la grille ne sont pas les bonnes (rapetissement)');
  console.assert(cells == '1', 'Le contenu de la matrice rapetissée n\'est pas le bon');

  // Annuler les changements effectués durant les tests
  cells = originalCells;
  width = originalWidth; height = originalHeight;

  Grid.create(height, width);
  colorGrid();

  return 'Tests unitaires effectués';
}
