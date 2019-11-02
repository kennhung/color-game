(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColorGame =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ColorGame, _React$Component);

  function ColorGame(props) {
    var _this;

    _classCallCheck(this, ColorGame);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorGame).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "showDiff", function () {
      _this.setState(_objectSpread({}, _this.state, {
        showDiff: true
      }));

      _this.stopTimer();
    });

    _this.state = {
      gameId: _uuid(),
      color: "",
      diffColor: "",
      diffLocation: [],
      showDiff: false,
      startTime: null,
      time: null,
      started: false,
      wrongAns: null,
      gameCycle: 0
    };
    return _this;
  }

  _createClass(ColorGame, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.reloadColorGame();
    }
  }, {
    key: "reloadColorGame",
    value: function reloadColorGame() {
      this.stopTimer();
      var color = this.getRandomColor();
      var diffColor;

      do {
        diffColor = this.getSimularColor(color, this.props.diffRange);
      } while (diffColor === color);

      var diffLocation = [Math.floor(Math.random() * (this.props.size - 1)), Math.floor(Math.random() * (this.props.size - 1))];
      this.setState(_objectSpread({}, this.state, {
        diffLocation: diffLocation,
        diffColor: diffColor,
        color: color,
        showDiff: false,
        wrongAns: null,
        gameCycle: this.state.gameCycle + 1
      }));
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.reloadColorGame();
      this.setState(_objectSpread({}, this.state, {
        started: true
      }));
      this.startTimer();
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      var _this2 = this;

      this.setState({
        startTime: Date.now()
      });
      this.timer = setInterval(function () {
        var timeLimit = _this2.props.timeLimit;

        var time = Date.now() - _this2.state.startTime;

        if (timeLimit > 0) {
          time = timeLimit - time;
        }

        if (time < 0) {
          _this2.showDiff();
        }

        _this2.setState({
          time: time
        });
      }, 1);
    }
  }, {
    key: "stopTimer",
    value: function stopTimer() {
      clearInterval(this.timer);
    }
  }, {
    key: "getRandomColor",
    value: function getRandomColor() {
      var color = '#';

      for (var i = 0; i < 6; i++) {
        var colorNum = Math.floor(Math.random() * 16);
        color += colorNum.toString(16);
      }

      return color;
    }
  }, {
    key: "getSimularColor",
    value: function getSimularColor(original, diff) {
      var color = "#";
      var changeLoc = Math.floor(Math.random() * 2);

      for (var i = 0; i < 3; i++) {
        var colorNum = parseInt(original.substr(2 * i + 1, 2), 16);

        if (i == changeLoc) {
          colorNum += Math.random() > 0.5 ? diff : -diff;

          if (colorNum > 255) {
            colorNum -= diff * 2;
          } else if (colorNum < 0) {
            colorNum += diff * 2;
          }
        }

        var colorStr = colorNum.toString(16);
        color += colorStr.length < 2 ? "0" + colorStr : colorStr;
      }

      return color;
    }
  }, {
    key: "clickBlock",
    value: function clickBlock(correct) {
      if (correct) {
        this.saveResult();
        this.reloadColorGame();
        this.startTimer();
      } else {
        this.setState(_objectSpread({}, this.state, {
          wrongAns: true
        }));
      }
    }
  }, {
    key: "saveResult",
    value: function saveResult() {
      var _this$state = this.state,
          color = _this$state.color,
          diffColor = _this$state.diffColor,
          gameId = _this$state.gameId,
          time = _this$state.time,
          diffLocation = _this$state.diffLocation;
      var data = {
        userId: this.props.userId,
        gameId: gameId,
        color: color,
        diffColor: diffColor,
        time: time,
        diffLocation: diffLocation
      };
      console.log(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var rows = [];
      var _this$state2 = this.state,
          diffLocation = _this$state2.diffLocation,
          color = _this$state2.color,
          diffColor = _this$state2.diffColor,
          started = _this$state2.started,
          time = _this$state2.time,
          wrongAns = _this$state2.wrongAns;

      for (var i = 0; i < this.props.size; i++) {
        var row = [];

        var _loop = function _loop(j) {
          var isDiff = i == diffLocation[0] && j == diffLocation[1];
          row.push(React.createElement("div", {
            className: "col text-center p-1 ",
            key: j,
            onClick: function onClick() {
              _this3.clickBlock(isDiff);
            }
          }, React.createElement("div", {
            className: "rounded mx-auto h-100",
            style: {
              backgroundColor: isDiff ? diffColor : color,
              opacity: _this3.state.showDiff && !isDiff ? "0.3" : "1"
            }
          })));
        };

        for (var j = 0; j < this.props.size; j++) {
          _loop(j);
        }

        rows.push(React.createElement("div", {
          className: "row",
          key: i,
          style: {
            height: "100px"
          }
        }, row));
      }

      return React.createElement("div", null, React.createElement("div", {
        className: this.props.debug ? "mb-1" : "d-none"
      }, React.createElement("button", {
        className: "btn btn-success",
        onClick: this.showDiff
      }, "Show different"), React.createElement("button", {
        className: "btn btn-success ml-1",
        onClick: function onClick() {
          return _this3.reloadColorGame();
        }
      }, "Next"), React.createElement("button", {
        className: "btn btn-success ml-1",
        onClick: function onClick() {
          return _this3.saveResult();
        }
      }, "Save result")), React.createElement("div", {
        className: "mb-3 text-center"
      }, React.createElement("h4", {
        className: "fade " + (!!wrongAns ? "show" : "")
      }, React.createElement("span", {
        className: "badge badge-danger"
      }, " Wrong Answer")), React.createElement("h5", null, started ? time > 0 ? React.createElement("span", {
        className: "badge badge-primary"
      }, Math.floor(time / 1000), ".", Math.floor(time % 1000), " sec") : React.createElement("span", {
        className: "badge badge-danger"
      }, "Time's Up") : React.createElement("span", {
        className: "badge badge-success"
      }, "Waiting to start"))), React.createElement("div", {
        className: !started ? "text-center" : "d-none"
      }, React.createElement("button", {
        className: "btn btn-primary btn-lg",
        onClick: function onClick() {
          _this3.startGame();
        }
      }, "Start")), React.createElement("div", {
        className: "text-center"
      }, started ? React.createElement("div", {
        className: "mx-1"
      }, rows) : null));
    }
  }]);

  return ColorGame;
}(React.Component);

var _default = ColorGame;
exports["default"] = _default;

},{}],2:[function(require,module,exports){
'use strict';

var _color_game = _interopRequireDefault(require("./color_game"));

var _userInformation = _interopRequireDefault(require("./userInformation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var e = React.createElement;

var MainSector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MainSector, _React$Component);

  function MainSector(props) {
    var _this;

    _classCallCheck(this, MainSector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainSector).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "setUserId", function (id) {
      _this.setState(_objectSpread({}, _this.state, {
        userId: id
      }));
    });

    _this.state = {
      gameStarted: false,
      userId: null,
      loaded: false,
      diffRange: null,
      size: null,
      timeLimit: null
    };
    return _this;
  }

  _createClass(MainSector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadConfig();
    }
  }, {
    key: "loadConfig",
    value: function loadConfig() {
      var _this2 = this;

      firebase.firestore().collection("settings").doc("default").get().then(function (doc) {
        var data = doc.data();

        _this2.setState(_objectSpread({}, _this2.state, {
          size: data.size,
          diffRange: data.diffRange,
          timeLimit: data.timeLimit,
          loaded: true
        }));
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          gameStarted = _this$state.gameStarted,
          userId = _this$state.userId,
          diffRange = _this$state.diffRange,
          timeLimit = _this$state.timeLimit,
          size = _this$state.size,
          loaded = _this$state.loaded;
      return React.createElement("div", {
        className: "container mt-5"
      }, React.createElement("div", {
        className: gameStarted ? "d-none d-md-block" : ""
      }, React.createElement("h2", null, "Find the different color"), React.createElement("p", null, "This is the demo of the different color finding game.")), loaded ? userId ? React.createElement(_color_game["default"], {
        timeLimit: timeLimit,
        size: size,
        diffRange: diffRange,
        debug: true,
        userId: userId
      }) : React.createElement(_userInformation["default"], {
        setUserId: this.setUserId
      }) : null);
    }
  }]);

  return MainSector;
}(React.Component);

var domContainer = document.querySelector('#main_container');
ReactDOM.render(e(MainSector), domContainer);

},{"./color_game":1,"./userInformation":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userInformation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(userInformation, _React$Component);

  function userInformation(props) {
    var _this;

    _classCallCheck(this, userInformation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(userInformation).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      _this.setState(_objectSpread({}, _this.state, _defineProperty({}, e.target.id, e.target.value)));
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (e) {
      e.preventDefault();
      console.log(_this.state);

      _this.props.setUserId("1");
    });

    _this.state = {
      birthday: null,
      gender: "Male"
    };
    return _this;
  }

  _createClass(userInformation, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        className: "card border-secondary"
      }, React.createElement("div", {
        className: "card-body"
      }, React.createElement("h5", {
        className: "card-title"
      }, "Basic Information"), React.createElement("h6", {
        className: "card-subtitle mb-2 text-muted"
      }, "some text...."), React.createElement("button", {
        className: "btn btn-secondary mb-2",
        onClick: function onClick() {
          return _this2.props.setUserId("skip");
        }
      }, "Skip"), React.createElement("form", {
        onSubmit: this.onSubmit
      }, React.createElement("div", {
        className: "form-group"
      }, React.createElement("label", {
        htmlFor: "birthday"
      }, "Birthday"), React.createElement("input", {
        required: true,
        type: "date",
        className: "form-control",
        id: "birthday",
        onChange: this.onChange
      })), React.createElement("div", {
        className: "form-group"
      }, React.createElement("label", {
        htmlFor: "gender"
      }, "Genger"), React.createElement("select", {
        required: true,
        className: "form-control",
        defaultValue: "Male",
        id: "gender",
        onChange: this.onChange
      }, React.createElement("option", null, "Male"), React.createElement("option", null, "Female"))), React.createElement("button", {
        className: "btn btn-primary btn-block"
      }, "Save"))));
    }
  }]);

  return userInformation;
}(React.Component);

var _default = userInformation;
exports["default"] = _default;

},{}]},{},[2]);
