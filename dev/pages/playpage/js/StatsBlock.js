"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function RankStatsGraph(props) {
  var rankStatsGraph = React.createRef();
  React.useEffect(function () {
    var canvas = rankStatsGraph.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth;

    window.onresize = function () {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetWidth;
      init();
    };

    var c = canvas.getContext('2d'); // Data

    var data = props.rankStatsGraphData;
    var maxDataLength = 10;

    function trimData() {
      var i = data.length - maxDataLength;

      if (i > 0) {
        while (i > 0) {
          data.shift();
          i--;
        }
      }
    }

    trimData(); // Variables

    var gap = 20; // the gap between the points and the axes from the borders
    // const baseColor = "#47B2F1";

    var baseColor = "#fff";
    var lineColor = "#555";
    var pointColor = "#D8456E";
    var textColor = "#47B2F1";
    var pointRadius = 7;
    var leastMaxValOfData = 20; // const xlabel = 'per game →';
    // const ylabel = 'rank →';

    var xlabel = '';
    var ylabel = '';
    var msg = "No stats"; // mouse cursor coordinates

    var mouse = {
      x: 0,
      y: 0
    };

    canvas.onmousemove = function (event) {
      var rect = event.currentTarget.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      mouse.x = x;
      mouse.y = y;
    };

    var Page = /*#__PURE__*/function () {
      function Page(xlabel, ylabel) {
        _classCallCheck(this, Page);

        this.xlabel = xlabel;
        this.ylabel = ylabel;
      }

      _createClass(Page, [{
        key: "draw",
        value: function draw() {
          //horizontal line
          c.beginPath();
          c.moveTo(gap, canvas.width - gap);
          c.lineTo(canvas.width, canvas.width - gap);
          c.strokeStyle = textColor;
          c.stroke();
          c.closePath(); // vertical line

          c.beginPath();
          c.moveTo(gap, canvas.height - gap);
          c.lineTo(gap, 0);
          c.strokeStyle = textColor;
          c.stroke();
          c.closePath(); // x-axis label

          c.beginPath();
          c.font = "17px Helvetica";
          c.fillStyle = textColor;
          c.textAlign = "center";
          c.fillText(this.xlabel, canvas.width / 2, canvas.height - gap / 2);
          c.closePath(); // y-axis label

          c.beginPath();
          c.font = "17px Helvetica";
          c.fillStyle = textColor;
          c.textAlign = "center";
          c.rotate(-Math.PI * 0.5);
          c.fillText(this.ylabel, -canvas.height / 2, (gap + 10) / 2);
          c.rotate(Math.PI * 0.5);
          c.closePath();
        }
      }, {
        key: "update",
        value: function update() {
          this.draw();
        }
      }]);

      return Page;
    }();

    var Point = /*#__PURE__*/function () {
      function Point(x, y, radius, yvalue) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = pointColor;
        this.dradius = 1;
        this.maxradius = 10;
        this.initialradius = radius;
        this.yvalue = yvalue;
        this.drawText = false;
      }

      _createClass(Point, [{
        key: "draw",
        value: function draw() {
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          c.fillStyle = this.color;
          c.fill();

          if (this.drawText) {
            c.beginPath();
            c.font = "15px Helvetica";
            c.fillStyle = textColor;
            c.textAlign = "center";

            if (this.y < this.radius + 50) {
              c.fillText(this.postfix(), this.x, this.y + this.maxradius * 2 + 15);
            } else {
              c.fillText(this.postfix(), this.x, this.y - this.maxradius - 5);
            }

            c.closePath();
          }
        }
      }, {
        key: "postfix",
        value: function postfix() {
          var add = '';

          if (this.yvalue % 10 === 1) {
            add = 'st';
          } else if (this.yvalue % 10 === 2) {
            add = 'nd';
          } else if (this.yvalue % 10 === 3) {
            add = 'rd';
          } else {
            add = 'th';
          }

          if (this.yvalue % 100 >= 10 && this.yvalue % 100 < 14) {
            add = 'th';
          }

          return this.yvalue + add;
        }
      }, {
        key: "update",
        value: function update() {
          if (mouse.x > this.x - this.radius && mouse.x < this.x + this.radius && mouse.y > this.y - this.radius && mouse.y < this.y + this.radius) {
            this.color = baseColor;
            this.drawText = true;

            if (this.radius <= this.maxradius) {
              this.radius += this.dradius;
            }
          } else {
            this.color = pointColor;
            this.drawText = false;

            if (this.radius >= this.initialradius) {
              this.radius -= this.dradius;
            }
          }

          this.draw();
        }
      }]);

      return Point;
    }();

    var Connect = /*#__PURE__*/function () {
      function Connect(coordinates) {
        _classCallCheck(this, Connect);

        this.coordinates = coordinates;
      }

      _createClass(Connect, [{
        key: "draw",
        value: function draw() {
          c.beginPath();
          c.moveTo(this.coordinates[0].x, this.coordinates[0].y);
          this.coordinates.map(function (co, index) {
            if (index != 0) {
              c.lineTo(co.x, co.y);
            }
          });
          c.strokeStyle = lineColor;
          c.stroke();
          c.closePath();
        }
      }, {
        key: "update",
        value: function update() {
          this.draw();
        }
      }]);

      return Connect;
    }();

    function plot(data) {
      // returns the coordinates of the data points
      var numOfValues = data.length;
      var maxVal = Math.max.apply(Math, _toConsumableArray(data)) < leastMaxValOfData ? leastMaxValOfData : Math.max.apply(Math, _toConsumableArray(data));
      var spacingX = (canvas.width - gap) / numOfValues;
      var spacingY = (canvas.height - 2 * gap) / maxVal;
      var coordinates = [];
      data.map(function (val, index) {
        var x = gap + spacingX * index;
        var y = val * spacingY + gap;
        coordinates.push({
          x: x,
          y: y,
          valy: val
        });
      });
      return coordinates;
    }

    var Text = /*#__PURE__*/function () {
      function Text(msg, color) {
        _classCallCheck(this, Text);

        this.msg = msg;
        this.color = color;
      }

      _createClass(Text, [{
        key: "draw",
        value: function draw() {
          c.beginPath();
          c.font = "17px Helvetica";
          c.fillStyle = textColor;
          c.textAlign = "center";
          c.fillText(this.msg, canvas.width / 2, canvas.height / 2);
          c.closePath();
        }
      }, {
        key: "update",
        value: function update() {
          this.draw();
        }
      }]);

      return Text;
    }();

    var points = [];
    var page;
    var connect;
    var coordinates;
    var text;

    function init() {
      // dissasociate all variables for multiple initialization
      points = [];
      page = undefined;
      connect = undefined;
      coordinates = undefined;
      text = undefined;

      if (data.length < 1) {
        /* do something */
        text = new Text(msg, baseColor);
      } else {
        // Initialize page
        page = new Page(xlabel, ylabel); // Initialize points

        coordinates = plot(data);
        coordinates.map(function (co) {
          points.push(new Point(co.x, co.y, pointRadius, co.valy));
        }); // Initialize connect

        connect = new Connect(coordinates);
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);

      if (data.length < 1) {
        /* do something */
        text.update();
      } else {
        page.update();
        connect.update();
        points.map(function (point) {
          point.update();
        });
      }
    }

    init();
    animate();
  });
  var element = /*#__PURE__*/React.createElement("canvas", {
    ref: rankStatsGraph,
    className: "w-100 rankStatsGraph"
  }, "your browser doesnt support canvas");
  return element;
}

function Stats(props) {
  var total = 0;
  props.rankStatsGraphData.map(function (val) {
    total += val;
  });
  var avgRank = (total / props.rankStatsGraphData.length).toFixed(2);
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lead pt-2 pb-4"
  }, "Your rank in the past games")), props.rankStatsGraphData === undefined || props.rankStatsGraphData.length < 1 ? /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-muted small text-center pt-2 pb-4"
  }, "you have not played any games yet")) : /*#__PURE__*/React.createElement(RankStatsGraph, {
    rankStatsGraphData: props.rankStatsGraphData
  }), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, props.rankStatsGraphData === undefined || props.rankStatsGraphData.length < 1 ? /*#__PURE__*/React.createElement("span", null) : /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, "Average Rank: ", avgRank), props.gameCategories.map(function (game) {
    if (game.id === props.game) return /*#__PURE__*/React.createElement("h2", {
      className: "lead py-4"
    }, "Top Players ", /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "(", game.name, ")"));
  }), /*#__PURE__*/React.createElement("ul", {
    className: "list-group list-group-flush"
  }, props.topPlayers.map(function (playersList) {
    if (playersList.game === props.game) {
      return playersList.players.map(function (player, index) {
        if (index === 0) {
          return /*#__PURE__*/React.createElement("li", {
            className: "list-group-item bg-dark border border-top-0 border-bottom-0 border-warning text-muted"
          }, player);
        }

        return /*#__PURE__*/React.createElement("li", {
          className: "list-group-item bg-dark text-muted"
        }, player);
      });
    }
  }))));
  return element;
}