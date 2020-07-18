"use strict";

function ActiveTournaments(props) {
  var activeTournaments = props.activeTournaments || [];
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "container py-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "d-block w-100 py-3 text-center text-light"
  }, "Active Tournaments"), activeTournaments.map(function (activeTourney) {
    var elem = /*#__PURE__*/React.createElement("div", {
      className: "p-3 mb-2 w-100 border border-dark text-light"
    }, /*#__PURE__*/React.createElement("p", {
      className: "d-block w-100 lead mb-1 text-center text-light"
    }, activeTourney.tournamentName), /*#__PURE__*/React.createElement("p", {
      className: "d-block w-100 text-muted text-center"
    }, "Game : ", activeTourney.game, /*#__PURE__*/React.createElement("br", null), "Slots : ", activeTourney.slots, " / ", activeTourney.slotsMax, /*#__PURE__*/React.createElement("br", null), "Game Type : ", activeTourney.gameType, /*#__PURE__*/React.createElement("br", null), "Link : ", /*#__PURE__*/React.createElement("a", {
      href: props.domain + "tournament/tid/" + activeTourney.tid
    }, "Click Here")));
    return elem;
  }), activeTournaments.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 p-2 my-5 text-muted text-center"
  }, "No Active Tournaments") : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  })));
  return element;
}