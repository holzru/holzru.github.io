const Board = require('./board');

const View = function ($el) {
  this.$el = $el;


  this.$speedBar = $('#speed-bar');
  this.$startButton = $("#start-button");
  this.$stopButton = $("#stop-button");
  this.$clearButton = $("#clear-button");
  this.$conwayOptions = $('#conway-options');
  this.$randomizeButton = $('#randomize-button');
  this.Xdim = 50;
  this.Ydim = 40;
  this.board = new Board(50);
  this.setupGrid();

  $(".cell").click(this.handleClick.bind(this));
  this.$startButton.click(this.start.bind(this));
  this.$stopButton.click(this.stop.bind(this));
  this.$speedBar.on('input', this.adjustSpeed.bind(this));
  this.$clearButton.click(this.clear.bind(this));
  this.$conwayOptions.on('change', this.gridSet.bind(this));
  this.$randomizeButton.click(this.randomize.bind(this));
};

View.prototype.gridSet = function () {
  this.customGrid($('#conway-options :selected').text());
};

View.prototype.randomize = function () {
  for (let i = 0; i < this.Ydim; i++) {
    let gen = 0;
    for (let j = 0; j < this.Xdim; j++) {
      if (gen % 2 === 0 || gen % 6 === 0) {
        this.board.grid[i][j] = 0;
      } else {
        this.board.grid[i][j] = parseInt(Math.random() * 10);
      }
      gen++;
    }
  }
  this.board.colorGenerations();
  this.start();
};

View.prototype.customGrid = function (type) {
  let cells = View.presetBoards(type);
  this.clear();
  cells.forEach((cell) => {
    this.board.grid[cell[0]][cell[1]] = 0;
  });
  this.board.colorGenerations();
};


View.presetBoards = function (input) {
  switch (input) {
    case "Pulsar":
      return ([[2, 6], [2, 7], [2, 8], [2, 12], [2, 13], [2, 14], [4, 4],
        [4, 9], [4, 11], [4, 16], [5, 4], [5, 9], [5, 11], [5, 16], [6, 4],
        [6, 9], [6, 11], [6, 16], [7, 6], [7, 7], [7, 8], [7, 12], [7, 13],
        [7, 14], [9, 6], [9, 7], [9, 8], [9, 12], [9, 13], [9, 14], [10, 4],
        [10, 9], [10, 11], [10, 16], [11, 4], [11, 9], [11, 11], [11, 16],
        [12, 4], [12, 9], [12, 11], [12, 16], [14, 6], [14, 7], [14, 8],
        [14, 12], [14, 13], [14, 14]]
        );
    case "Glider Gun":
      return ([[11, 25], [12, 23], [12, 25], [13, 13], [13, 14], [13, 21], [13, 22],
              [13, 35], [13, 36], [14, 12], [14, 16], [14, 21], [14, 22], [14, 35],
              [14, 36], [15, 1], [15, 2], [15, 11], [15, 17], [15, 21], [15, 22],
              [16, 1], [16, 2], [16, 11], [16, 15], [16, 17], [16, 18], [16, 23],
              [16, 25], [17, 11], [17, 17], [17, 25], [18, 12], [18, 16], [19, 13],
              [19, 14]]);
    case "Explosion":
      return ([[17, 19], [17, 20], [18, 18], [18, 20], [19, 18], [19, 20], [20, 19]]);
    case "Fireworks!":
      return ([[17, 19], [17, 20], [18, 18], [18, 20], [19, 18], [19, 20], [20, 19],
              [10, 12], [10, 13], [11, 11], [11, 13], [12, 11], [12, 13], [13, 12],
              [15, 32], [15, 33], [16, 31], [16, 33], [17, 31], [17, 33], [18, 32],
              [24, 26], [24, 27], [25, 25], [25, 27], [26, 25], [26, 27], [27, 26],
              [24, 6], [24, 7], [25, 5], [25, 7], [26, 5], [26, 7], [27, 6],
              [3, 9], [3, 10], [4, 8], [4, 10], [5, 8], [5, 10], [6, 9],
              [7, 29], [7, 30], [8, 28], [8, 30], [9, 28], [9, 30], [10, 29],
              [31, 33], [31, 34], [32, 32], [32, 34], [33, 32], [33, 34], [34, 33],
              [31, 13], [31, 14], [32, 12], [32, 14], [33, 12], [33, 14], [34, 13]]);
    case "Beacon":
      return ([[17, 19], [17, 20], [18, 19], [19, 22], [20, 21], [20, 22]]);
    case "Acorn":
      return ([[17, 19], [18, 21], [19, 18], [19, 19], [19, 22], [19, 23], [19, 24]]);
    case "Acorn Bonanza!":
      return ([[17, 19], [18, 21], [19, 18], [19, 19], [19, 22], [19, 23], [19, 24],
              [7, 9], [8, 11], [9, 8], [9, 9], [9, 12], [9, 13], [9, 14],
              [7, 29], [8, 31], [9, 28], [9, 29], [9, 32], [9, 33], [9, 34],
              [27, 29], [28, 31], [29, 28], [29, 29], [29, 32], [29, 33], [29, 34],
              [27, 9], [28, 11], [29, 8], [29, 9], [29, 12], [29, 13], [29, 14],
              // [12, 14], [13, 16], [14, 13], [14, 14], [14, 17], [14, 18], [14, 19],
              [17, 39], [18, 41], [19, 38], [19, 39], [19, 42], [19, 43], [19, 44]]);
    case "Spaceship":
      return ([[7, 37], [7, 38], [8, 36], [8, 37], [8, 38], [8, 39],
              [9, 35], [9, 36], [9, 38], [9, 39], [10, 36], [10, 37]]);
    case "Braced Pentadecathlon":
      return ([[9, 14], [9, 24], [10, 14], [10, 15], [10, 16], [10, 22], [10, 23],
        [10, 24], [11, 17], [11, 21], [12, 16], [12, 17], [12, 21], [12, 22],
        [14, 19], [15, 19], [16, 20], [16, 18], [17, 19], [18, 19], [19, 19],
        [20, 19], [21, 18], [21, 20], [22, 19], [23, 19], [25, 17], [25, 16],
        [25, 21], [25, 22], [26, 17], [26, 21], [27, 14], [27, 15], [27, 16],
        [27, 22], [27, 23], [27, 24], [28, 14], [28, 24]]);
    case "Pentadecathlon":
      return ([[14, 19], [15, 19], [16, 20], [16, 18], [17, 19], [18, 19], [19, 19],
       [20, 19], [21, 18], [21, 20], [22, 19], [23, 19]]);
    default:
      return [];
    }
};

View.prototype.adjustSpeed = function(e) {
  this.stop();
  View.STEP_MILLIS = this.$speedBar[0].value;
  $('.speed').html(`<span class="speed">${View.STEP_MILLIS}</span>`);
  this.start();
};

View.STEP_MILLIS = 100;

View.prototype.handleClick = function (event) {
  let cell = $(event.currentTarget)[0];
  let pos = cell.id.split("and").map((x) => { return parseInt(x);});
  if (this.board.grid[pos[0]][pos[1]] === 0) {
    this.board.grid[pos[0]][pos[1]] = 11;
  } else {
    this.board.grid[pos[0]][pos[1]] = 0;
    console.log('click');
  }
  this.board.colorGenerations();
};

Array.prototype.actIncludes = function(arr1) {
  let condition = false;
  this.forEach((subArray) => {
    if (subArray[0] === arr1[0] && subArray[1] === arr1[1]) {
      condition = true;
    }
  });
  return condition;
};

View.prototype.setupGrid = function () {
  let html = "";
  for (let i = 0; i < this.Ydim; i++) {
    html += "<ul>";
    for (let j = 0; j < this.Xdim; j++) {
      html += `<li class="cell" id='${i}and${j}'></li>`;
    }
    html += "</ul>";
  }
  this.$el.html(html);
  this.$li = this.$el.find("li");
};

View.prototype.start = function () {
  this.intervalId = window.setInterval(
    this.step.bind(this),
    View.STEP_MILLIS
  );
};

View.prototype.stop = function () {
  clearInterval(this.intervalId);
};

View.prototype.clear = function () {
  this.board = new Board(50);
  this.board.colorGenerations();
};


View.prototype.step = function () {
  if (!this.board.over()) {
    this.board.neighbors();
    this.board.colorGenerations();
  } else {
    this.stop();
    this.clear();
    clearInterval(this.intervalId);
  }
};

module.exports = View;
