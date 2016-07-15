const Board = function (dim) {
  this.dim = dim;
  this.grid = Board.blankGrid(this.dim);
  this.begun = false;
};

Board.blankGrid = function (dim) {
  const grid = [];
  for (let i = 0; i < dim; i++) {
    const row = [];
    for (let j = 0; j < dim; j++) {
      row.push(10);
    }
    grid.push(row);
  }

  return grid;
};

Board.diffs = function() {
  return([[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]]);
};

Board.prototype.findNeighborCount = function (coord) {
  let neighbors = [];
  Board.diffs().forEach((diff) => {
    let newCoord = [(coord[0]+diff[0]), (coord[1]+diff[1])];
    neighbors.push(newCoord);
  });
  let count = 0;
  neighbors.forEach((cell) => {
    if (this.inBounds(cell)) {
      if (this.grid[cell[0]][cell[1]] === 0) {
        count++;
      }
    }
  });
  return count;
};

Board.prototype.inBounds = function(coord) {
  let condition = true;
  coord.forEach((point) => {
    if (point >= this.dim || point < 0) {
      condition = false;
    }
  });
  return condition;
};

Board.prototype.over = function () {
  if (!this.begun) {
    return false;
  }
  let condition = true;
  this.grid.forEach((row) => {
    row.forEach((term) => {
      if (term < 7 ) {
        condition = false;
      }
    });
  });
  return condition;
};

Board.prototype.neighbors = function () {
  this.begun = true;
  let nextGen = [];
  let toAge = [];
  let cells = $('.cell').toArray();
  cells.forEach((cell) => {
    let pos = cell.id.split("and").map((x) => { return parseInt(x);});
    let nCount = this.findNeighborCount(pos);
    if (nCount === 3) {
      nextGen.push(pos);
    } else if (nCount === 2) {
      if (this.grid[pos[0]][pos[1]] !== 0) {
        toAge.push(pos);
      }
    } else {
      if (this.grid[pos[0]][pos[1]] < 8) {
        toAge.push(pos);
      }
    }
  });
  nextGen.forEach((coord) => {
    this.grid[coord[0]][coord[1]] = 0;
  });
  toAge.forEach((coord) => {
    this.grid[coord[0]][coord[1]]++;
  });

};

Board.prototype.colorGenerations = function () {
  let cells = $('.cell').toArray();
  cells.forEach((cell) => {
    let pos = cell.id.split("and").map((x) => { return parseInt(x);});
    switch (this.grid[pos[0]][pos[1]]) {
      case 0:
        $(cell).css("background-color", "red");
        break;
      case 1:
        $(cell).css("background-color", "orange");
        break;
      case 2:
        $(cell).css("background-color", "yellow");
        break;
      case 3:
        $(cell).css("background-color", "green");
        break;
      case 4:
        $(cell).css("background-color", "blue");
        break;
      case 5:
        $(cell).css("background-color", "purple");
        break;
      case 6:
        $(cell).css("background-color", "pink");
        break;
      default:
        $(cell).css("background-color", "white");
        break;
    }
  });
};



module.exports = Board;
