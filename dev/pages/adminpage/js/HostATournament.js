"use strict";

function HostATournament(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "container py-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "d-block w-100 py-3 text-center text-light"
  }, "Host a Tournament"), /*#__PURE__*/React.createElement("div", {
    className: "p-3 text-light text-center"
  }, /*#__PURE__*/React.createElement("select", {
    name: "game",
    value: props.game,
    onChange: function onChange(event) {
      props.setData("game", event.currentTarget.value);
    },
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Choose game"), props.games.map(function (game) {
    return /*#__PURE__*/React.createElement("option", {
      value: game.id
    }, game.name);
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "tournament-name",
    value: props.tournamentName,
    onChange: function onChange(event) {
      props.setData("tournamentName", event.currentTarget.value);
    },
    placeholder: "Tournament Name",
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "max-players",
    value: props.maxPlayers,
    onChange: function onChange(event) {
      props.setData("maxPlayers", event.currentTarget.value);
    },
    placeholder: "Max Players",
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: props.date,
    onChange: function onChange(event) {
      props.setData("date", event.currentTarget.value);
    },
    name: "date",
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: props.time,
    onChange: function onChange(event) {
      props.setData("time", event.currentTarget.value);
    },
    name: "time",
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }), /*#__PURE__*/React.createElement("select", {
    name: "game-mode",
    value: props.gameMode,
    onChange: function onChange(event) {
      props.setData("gameMode", event.currentTarget.value);
    },
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "tpp"
  }, "TPP"), /*#__PURE__*/React.createElement("option", {
    value: "fpp"
  }, "FPP")), /*#__PURE__*/React.createElement("select", {
    name: "game-type",
    value: props.gameType,
    onChange: function onChange(event) {
      props.setData("gameType", event.currentTarget.value);
    },
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "solo"
  }, "solo"), /*#__PURE__*/React.createElement("option", {
    value: "duo"
  }, "duo"), /*#__PURE__*/React.createElement("option", {
    value: "trio"
  }, "trio"), /*#__PURE__*/React.createElement("option", {
    value: "squad"
  }, "squad")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "mapName",
    value: props.mapName,
    onChange: function onChange(event) {
      props.setData("mapName", event.currentTarget.value);
    },
    placeholder: "map name",
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: props.entryFees,
    onChange: function onChange(event) {
      props.setData("entryFees", event.currentTarget.value);
    },
    name: "entry-fees",
    placeholder: "Entry Fees in INR",
    className: "d-block w-100 m-2 bg-dark text-light p-2 form-control",
    style: {
      border: "none"
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "d-block w-100 p-2 lead text-light text-center"
  }, "Rewards"), /*#__PURE__*/React.createElement("table", {
    className: "table table-dark my-3"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Position"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Reward (\u20B9)"))), /*#__PURE__*/React.createElement("tbody", null, props.rewards.map(function (reward) {
    var elem = /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 p-2 text-light text-center"
    }, reward.position)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 p-2 text-light text-center"
    }, reward.reward)));
    return elem;
  }), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: props.position,
    onChange: function onChange(event) {
      props.setPosition(parseInt(event.currentTarget.value));
    },
    placeholder: "Position",
    name: "position",
    onKeyDown: props.handleRewards,
    className: "d-block w-100 p-2 bg-dark text-light form-control",
    style: {
      border: "none"
    }
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: props.reward,
    onChange: function onChange(event) {
      props.setReward(parseInt(event.currentTarget.value));
    },
    placeholder: "Reward (INR)",
    name: "reward",
    onKeyDown: props.handleRewards,
    className: "d-block w-100 p-2 bg-dark text-light form-control",
    style: {
      border: "none"
    }
  }))))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: props.sendTournamentData
  }, "Host Tournament"))));
  return element;
}