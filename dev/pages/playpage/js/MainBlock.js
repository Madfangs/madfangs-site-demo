"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var stop = 0;
var scrollValue = 0;

function stopScroll() {
  return;
  window.scrollTo(0, stop);
}

function preventScrollY(event) {
  return;
  stop = window.scrollY;
  window.addEventListener('scroll', stopScroll);
}

function resumeScrollY() {
  return;
  window.removeEventListener('scroll', stopScroll);
}

function scrollNow(event) {
  var val = event.currentTarget.scrollLeft;
  event.currentTarget.scrollTo(val + event.deltaY, 0);
}

function TournamentCard(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "px-1 col-12 col-md-6 card tournament-card my-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card col-12 px-0 tournament-card border border-dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body py-5",
    style: {
      backgroundImage: 'linear-gradient(to bottom, rgba(28, 28, 28, 0.4), rgba(28, 28, 28, 0.8)), url(img/jpg/fortnite-tournamentimg-' + props.background + '.jpg)',
      backgroundSize: 'cover'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title lead text-center"
  }, props.name), /*#__PURE__*/React.createElement("div", {
    className: "card-text"
  }, props.subheading)), /*#__PURE__*/React.createElement("div", {
    className: "card-footer border-top border-dark text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-text text-muted my-1"
  }, /*#__PURE__*/React.createElement("i", {
    "class": "im im-clock-o"
  }), " ", props.dateandtime), /*#__PURE__*/React.createElement("div", {
    className: "card-text text-muted my-1"
  }, /*#__PURE__*/React.createElement("i", {
    "class": "im im-award"
  }), " ", props.prizepool), /*#__PURE__*/React.createElement("div", {
    className: "card-text text-muted my-1"
  }, /*#__PURE__*/React.createElement("i", {
    "class": "im im-users"
  }), " ", props.type), /*#__PURE__*/React.createElement("div", {
    className: "card-text text-muted my-1"
  }, /*#__PURE__*/React.createElement("i", {
    "class": "im im-server"
  }), " ", props.server, " Server")), /*#__PURE__*/React.createElement("div", {
    className: "card-footer border-top border-dark text-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: props.domain + 'play/tournament/' + props.game + '/' + props.id
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary"
  }, "Check it out")))));
  return element;
}

function ScrimCard(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-xl-6 my-2 scrim-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row align-items-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: 'img/png/' + props.game + '-icon.png',
    className: "game-icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lead"
  }, props.title), /*#__PURE__*/React.createElement("div", {
    className: "small text-muted pb-1"
  }, "Code: ", props.code), /*#__PURE__*/React.createElement("p", {
    className: "text-muted"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/React.createElement("i", {
    "class": "im im-users"
  }), /*#__PURE__*/React.createElement("div", {
    className: "small pl-1 d-inline"
  }, props.participants, " / ", props.participantsLimit)), /*#__PURE__*/React.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/React.createElement("i", {
    "class": "im im-trophy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "small pl-1 d-inline"
  }, props.expReward, " exp ")))))));
  return element;
}

function HandleScrimCards(props) {
  var element;
  var gameExistsInList = false;
  props.scrimsList.map(function (scrims) {
    if (scrims.game === props.game) gameExistsInList = true;
  });
  element = /*#__PURE__*/React.createElement(React.Fragment, null, props.scrimsList.map(function (scrims) {
    if (scrims.game === props.game) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, scrims.scrims.map(function (scrim) {
        if (props.type === scrim.type) {
          return /*#__PURE__*/React.createElement(ScrimCard, {
            key: scrims.code,
            game: props.game,
            title: scrim.title,
            code: scrim.code,
            participants: scrim.participants,
            participantsLimit: scrim.participantsLimit,
            expReward: scrim.expReward
          });
        }
      }));
    }
  }));
  if (gameExistsInList) return element;else return /*#__PURE__*/React.createElement("div", {
    className: "text-center my-4 text-muted"
  }, "No Scrims are hosted for this game");
}

function Slide(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: props.id === 1 ? 'carousel-item active' : 'carousel-item'
  }, /*#__PURE__*/React.createElement("img", {
    src: props.domain + 'img/jpg/playpage-carousel-' + props.id + '.jpg',
    className: "w-100"
  }), /*#__PURE__*/React.createElement("div", {
    className: "carousel-caption d-none d-md-block"
  }, /*#__PURE__*/React.createElement("h5", null, props.heading), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, props.body)));
  return element;
}

function Carousel(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "w-100 mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    id: "carouselExampleIndicators",
    className: "carousel slide",
    "data-ride": "carousel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "carousel-inner"
  }, props.slides.map(function (slide) {
    return /*#__PURE__*/React.createElement(Slide, {
      key: slide.id,
      id: slide.id,
      heading: slide.heading,
      body: slide.body,
      domain: props.domain
    });
  })), /*#__PURE__*/React.createElement("a", {
    className: "carousel-control-prev",
    href: "#carouselExampleIndicators",
    role: "button",
    "data-slide": "prev"
  }, /*#__PURE__*/React.createElement("span", {
    className: "carousel-control-prev-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Previous")), /*#__PURE__*/React.createElement("a", {
    className: "carousel-control-next",
    href: "#carouselExampleIndicators",
    role: "button",
    "data-slide": "next"
  }, /*#__PURE__*/React.createElement("span", {
    className: "carousel-control-next-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Next"))));
  return element;
}

function GameCategory(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "card col-4 col-md-3 col-lg-2 game-card px-0 bg-dark mr-3",
    onClick: props.handleClick,
    "data-key": props.game.id
  }, /*#__PURE__*/React.createElement("img", {
    src: props.domain + 'img/jpg/' + props.game.id + '-card.jpg',
    alt: props.game.name + ' Card',
    className: "card-img-top"
  }));
  return element;
}

function MainBlock(props) {
  var _React$useState = React.useState(props.showingGame),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showingGame = _React$useState2[0],
      setShowingGame = _React$useState2[1];

  var _React$useState3 = React.useState('solo'),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      gameType = _React$useState4[0],
      setGameType = _React$useState4[1];

  function handleCategoryChange(event) {
    // change the game for which the scrims and tournaments are displayed
    setShowingGame(event.currentTarget.getAttribute('data-key'));
  }

  function handleTypeChange(event) {
    // Change the type of game displayed in scrims (solo, duo or squad)
    setGameType(event.currentTarget.value);
  }

  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-lg-9"
  }, /*#__PURE__*/React.createElement(Carousel, {
    domain: props.domain,
    slides: props.slides
  }), /*#__PURE__*/React.createElement("div", {
    className: "lead mb-3"
  }, "Check out all our games"), /*#__PURE__*/React.createElement("div", {
    className: "container-fluid game-card-- mb-5",
    onMouseEnter: preventScrollY,
    onMouseLeave: resumeScrollY,
    onWheel: scrollNow,
    id: "hori-scroll-this"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row flex-nowrap"
  }, props.gameCategories.map(function (game) {
    return /*#__PURE__*/React.createElement(GameCategory, {
      key: game.id,
      game: game,
      domain: props.domain,
      handleClick: handleCategoryChange
    });
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row my-3"
  }, props.gameCategories.map(function (game) {
    if (game.id === showingGame) return /*#__PURE__*/React.createElement("div", {
      className: "lead mx-1"
    }, "Tournaments for ", game.name, ":");
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-around flex-wrap mt-4 mb-5"
  }, props.tournamentsList.map(function (list) {
    if (list.game === showingGame) {
      if (list.tournaments.length < 1) {
        return /*#__PURE__*/React.createElement("div", {
          className: "text-center my-4 text-muted"
        }, "No Tournaments are hosted for this game");
      }

      return list.tournaments.map(function (tournament) {
        return /*#__PURE__*/React.createElement(TournamentCard, {
          key: tournament.id,
          id: tournament.id,
          domain: props.domain,
          game: showingGame,
          name: tournament.name,
          subheading: tournament.subheading,
          dateandtime: tournament.dateandtime,
          prizepool: tournament.prizepool,
          type: tournament.type,
          server: tournament.server,
          background: tournament.background
        });
      });
    }
  }), function () {
    var gameExistsInList = false;
    props.tournamentsList.map(function (list) {
      if (list.game === showingGame) gameExistsInList = true;
    });
    if (!gameExistsInList) return /*#__PURE__*/React.createElement("div", {
      className: "text-center my-4 text-muted"
    }, "No Tournaments are hosted for this game");
  }()), /*#__PURE__*/React.createElement("div", {
    className: "lead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, props.gameCategories.map(function (game) {
    if (game.id === showingGame) return /*#__PURE__*/React.createElement("p", {
      className: "pl-1"
    }, "Showing scrims for ", game.name, " : ");
  }), /*#__PURE__*/React.createElement("select", {
    className: "custom-select col-10 col-lg-4 mx-auto bg-dark text-light game-type",
    onChange: handleTypeChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "solo",
    selected: true
  }, "solo"), /*#__PURE__*/React.createElement("option", {
    value: "duo"
  }, "duo"), /*#__PURE__*/React.createElement("option", {
    value: "squad"
  }, "squad")))), /*#__PURE__*/React.createElement("div", {
    className: "container-fluid d-flex justify-content-around flex-wrap my-4"
  }, /*#__PURE__*/React.createElement(HandleScrimCards, {
    scrimsList: props.scrimsList,
    game: showingGame,
    type: gameType
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-3 d-none d-lg-block"
  }, /*#__PURE__*/React.createElement(Stats, {
    rankStatsGraphData: data.rankStatsGraphData,
    gameCategories: props.gameCategories,
    game: showingGame,
    topPlayers: data.topPlayers
  })));
  return element;
}