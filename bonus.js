/**
 *  @fileOverview IFT1015 - Bonus du TP1: Conway's Game of Life
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

// Matrice/Grille et ses caractéristiques
let width = 40;
let height = 40;
const colors = ['black', 'red', 'green', 'yellow', 'blue', 'fuchsia', 'turquoise', 'white'];
let cells = array2D(width, height);

/**
 * Définit l'état d'une cellule.
 *
 * @param {object} arr - Matrice à modifier
 * @param {number} x - Position selon l'axe des x
 * @param {number} y - Position selon l'axe des y
 * @param {number} state - État de la cellule
 */
function setState(arr, x, y, state) {
  if (state === undefined) {
    arr[x][y] = Math.floor((Math.random() * 7) + 1);
  } else {
    arr[x][y] = state;
  }

  Grid.colorCell(x, y, colors[arr[x][y]]);
}

/**
 * Change l'état d'une cellule, en l'incrémentant.
 */
function changeState(x, y) {
  cells[x][y] < 7 ? cells[x][y] += 1 : cells[x][y] = 0;
  Grid.colorCell(x, y, colors[cells[x][y]]);
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

  const neighbors = [
    cells[left][top],
    cells[left][y],
    cells[left][bottom],
    cells[right][top],
    cells[right][y],
    cells[right][bottom],
    cells[x][top],
    cells[x][bottom],
  ];

  const aliveByGrid = [0, 0, 0];

  for (let i = 0; i < neighbors.length; i += 1) {
    const neighbor = neighbors[i];

    // Grille 1: 1, 3, 5, 7
    if (neighbor % 2 === 1) {
      aliveByGrid[0] += 1;
    }

    // Grille 2: 2, 3, 6, 7
    if (neighbor === 2 || neighbor === 3 || neighbor >= 6) {
      aliveByGrid[1] += 1;
    }

    // Grille 3: 4, 5, 6, 7
    if (neighbor >= 4) {
      aliveByGrid[2] += 1;
    }
  }

  return aliveByGrid;
}

/**
 * Logique de l'automate appliquée à une grille.
 *
 * @param {number} cell - Cellule (vivante ou morte)
 * @param {number} neighbors - Nombre de voisins vivants
 */
function stepByGrid(cell, neighbors) {
  if (cell) {
    if (neighbors === 2 || neighbors === 3) {
      return '1';
    }
  } else if (neighbors === 3) {
    return '1';
  }

  return '0';
}

/**
 * Représente un "pas" de l'évolution du jeu.
 */
function step() {
  const nextCells = array2D(width, height);

  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      // Entier (number) -> Binaire (string, 3 caractères)
      const cell = `00${cells[i][j].toString(2)}`.slice(-3);
      const neighbors = aliveNeighbors(i, j);

      // Binaire (string, 3 caractères) -> Entier (number)
      let nextCell = '0b';
      nextCell += stepByGrid(+cell[0], neighbors[2]) +
                  stepByGrid(+cell[1], neighbors[1]) +
                  stepByGrid(+cell[2], neighbors[0]);
      nextCells[i][j] = Number(nextCell);

      Grid.colorCell(i, j, colors[nextCells[i][j]]);
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
        setState(cells, i, j);
      } else if (cells[i][j]) {
        setState(cells, i, j, 0);
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
        setState(cells, i, j, 0);
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
      Grid.colorCell(i, j, colors[cells[i][j]]);
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

  // setState
  const arr = [[0]];

  setState(arr, 0, 0);
  console.assert(arr[0][0] > 0 && arr[0][0] < 8, 'L\'état n\'a pas été définit correctement (cas aléatoire)');

  setState(arr, 0, 0, 7);
  console.assert(arr[0][0] === 7, 'L\'état n\'a pas été définit correctement (cas non aléatoire)');

  // changeState
  cells = [[7]];
  width = 1; height = 1;

  changeState(0, 0);
  console.assert(cells[0][0] === 0, 'La cellule n\'est pas passée de l\'état 7 à l\'état 0');

  changeState(0, 0);
  console.assert(cells[0][0] === 1, 'La cellule n\'est pas passée de l\'état 0 à l\'état 1 (incrémentation)');

  // aliveNeighbors
  cells = [
    [1, 0, 0, 0, 3],
    [0, 1, 3, 5, 0],
    [0, 7, 1, 7, 0],
    [0, 5, 3, 1, 0],
    [7, 0, 0, 0, 5],
  ];
  width = 5; height = 5;
  console.assert(aliveNeighbors(2, 2)[0] === 8, 'La cellule ne contient pas le bon nombre de voisins (grille 1, cas sans "warp")');
  console.assert(aliveNeighbors(0, 0)[0] === 4, 'La cellule ne contient pas le bon nombre de voisins (grille 1, cas avec "warp")');

  cells = [
    [2, 0, 0, 0, 3],
    [0, 2, 3, 6, 0],
    [0, 7, 2, 7, 0],
    [0, 6, 3, 2, 0],
    [7, 0, 0, 0, 6],
  ];
  width = 5; height = 5;
  console.assert(aliveNeighbors(2, 2)[1] === 8, 'La cellule ne contient pas le bon nombre de voisins (grille 2, cas sans "warp")');
  console.assert(aliveNeighbors(0, 0)[1] === 4, 'La cellule ne contient pas le bon nombre de voisins (grille 2, cas avec "warp")');

  cells = [
    [4, 0, 0, 0, 5],
    [0, 4, 5, 6, 0],
    [0, 7, 4, 7, 0],
    [0, 6, 5, 4, 0],
    [7, 0, 0, 0, 6],
  ];
  width = 5; height = 5;
  console.assert(aliveNeighbors(2, 2)[2] === 8, 'La cellule ne contient pas le bon nombre de voisins (grille 3, cas sans "warp")');
  console.assert(aliveNeighbors(0, 0)[2] === 4, 'La cellule ne contient pas le bon nombre de voisins (grille 3, cas avec "warp")');

  // stepByGrid
  console.assert(stepByGrid(1, 1) === '0', 'La sous-population n\'a pas tué la cellule');
  console.assert(stepByGrid(1, 4) === '0', 'La sur-population n\'a pas tué la cellule');
  console.assert(stepByGrid(1, 2) === '1', 'La cellule n\'est pas restée en vie (cas avec 2 voisins vivants)');
  console.assert(stepByGrid(1, 3) === '1', 'La cellule n\'est pas restée en vie (cas avec 3 voisins vivants)');
  console.assert(stepByGrid(0, 3) === '1', 'La reproduction n\'a pas eu lieu');
  console.assert(stepByGrid(0, 2) === '0', 'La reproduction a eu lieu');

  // step
  cells = [
    [0, 0, 0],
    [0, 7, 0],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 0, 'La sous-population n\'a pas tué la cellule');

  cells = [
    [7, 7, 7],
    [7, 7, 7],
    [7, 7, 7],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 0, 'La sur-population n\'a pas tué la cellule');

  cells = [
    [0, 0, 0],
    [7, 7, 7],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 7, 'La cellule n\'est pas restée en vie (cas avec 2 voisins vivants)');

  cells = [
    [0, 7, 0],
    [7, 7, 7],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 7, 'La cellule n\'est pas restée en vie (cas avec 3 voisins vivants)');

  cells = [
    [0, 7, 0],
    [7, 0, 7],
    [0, 0, 0],
  ];
  width = 3; height = 3;
  step();
  console.assert(cells[1][1] === 7, 'La reproduction n\'a pas eu lieu');

  cells = [
    [0, 0, 0],
    [7, 0, 7],
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
      if (cells[i][j] > 0) {
        aliveCells += 1;
      }
    }
  }

  console.assert(aliveCells > 40, 'Le nombre de cellules en vie de façon aléatoire est trop petit');
  console.assert(aliveCells < 60, 'Le nombre de cellules en vie de façon aléatoire est trop grand');

  // resetGrid
  cells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 0],
  ];
  width = 3; height = 3;

  resetGrid();
  console.assert(cells == '0,0,0,0,0,0,0,0,0', 'La matrice n\'a pas été réinitialisée');

  // resizeGrid
  cells = [[7]];
  width = 1; height = 1;

  resizeGrid(2, 2);
  console.assert(cells.length === 2, 'La matrice agrandie n\'a pas le bon nombre de lignes');
  console.assert(cells[0].length === 2, 'La matrice agrandie n\'a pas le bon nombre de colonnes');
  console.assert(width === 2 && height === 2, 'Les dimensions de la grille ne sont pas les bonnes (agrandissement)');
  console.assert(cells == '7,0,0,0', 'Le contenu de la matrice agrandie n\'est pas le bon');

  resizeGrid(1, 1);
  console.assert(cells.length === 1, 'La matrice rapetissée n\'a pas le bon nombre de lignes');
  console.assert(cells[0].length === 1, 'La matrice rapetissée n\'a pas le bon nombre de colonnes');
  console.assert(width === 1 && height === 1, 'Les dimensions de la grille ne sont pas les bonnes (rapetissement)');
  console.assert(cells == '7', 'Le contenu de la matrice rapetissée n\'est pas le bon');

  // Annuler les changements effectués durant les tests
  cells = originalCells;
  width = originalWidth; height = originalHeight;

  Grid.create(height, width);
  colorGrid();

  return 'Tests unitaires effectués';
}
