/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const ConwayView = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function() {
	  $(function () {
	    const rootEl = $('.conway');
	    new ConwayView(rootEl);
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	
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
	    case "Blinker":
	      return;
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
	    alert ('evolution over');
	    clearInterval(this.intervalId);
	  }
	};
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map