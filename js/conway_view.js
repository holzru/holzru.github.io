const Board = require('./board');

const View = function ($el) {
  this.$el = $el;


  this.$speedBar = $('#speed-bar');
  this.$startButton = $("#start-button");
  this.$stopButton = $("#stop-button");
  this.$clearButton = $("#clear-button");
  this.$conwayOptions = $('#conway-options');
  this.board = new Board(40);
  this.setupGrid();

  $(".cell").click(this.handleClick.bind(this));
  this.$startButton.click(this.start.bind(this));
  this.$stopButton.click(this.stop.bind(this));
  this.$speedBar.on('input', this.adjustSpeed.bind(this));
  this.$clearButton.click(this.clear.bind(this));
  this.$conwayOptions.on('change', this.gridSet.bind(this));
};

View.prototype.gridSet = function () {
  this.customGrid($('#conway-options :selected').text());
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
      return ([[2, 6], [2, 7], [2, 8], [2, 12], [2, 13], [2, 14], [4, 4], [4, 9],
        [4, 11], [4, 16], [5, 4], [5, 9], [5, 11], [5, 16], [6, 4], [6, 9],
        [6, 11], [6, 16], [7, 6], [7, 7], [7, 8], [7, 12], [7, 13], [7, 14], [9, 6],
        [9, 7], [9, 8], [9, 12], [9, 13], [9, 14], [10, 4], [10, 9], [10, 11],
        [10, 16], [11, 4], [11, 9], [11, 11], [11, 16], [12, 4], [12, 9], [12, 11],
        [12, 16], [14, 6], [14, 7], [14, 8], [14, 12], [14, 13], [14, 14]]
        );
    default:
      return [];
    }
};

View.prototype.adjustSpeed = function(e) {
  View.STEP_MILLIS = this.$speedBar[0].value;
  $('.speed').html(`<span class="speed">${View.STEP_MILLIS}</span>`);
};

View.STEP_MILLIS = 100;

View.prototype.handleClick = function (event) {
  let cell = $(event.currentTarget)[0];
  let pos = cell.id.split("and").map((x) => { return parseInt(x);});
  if (this.board.grid[pos[0]][pos[1]] === 0) {
    this.board.grid[pos[0]][pos[1]] = 10;
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
  for (let i = 0; i < this.board.dim; i++) {
    html += "<ul>";
    for (let j = 0; j < this.board.dim; j++) {
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
  this.board = new Board(40);
  this.board.colorGenerations();
};


View.prototype.step = function () {
  if (!this.board.over()) {
    this.board.neighbors();
    this.board.colorGenerations();
  } else {
    alert ('model over');
    clearInterval(this.intervalId);
  }
};

module.exports = View;
