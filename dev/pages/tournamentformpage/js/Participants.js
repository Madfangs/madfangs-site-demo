"use strict";

function Participants(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, props.playerCount >= 1 ? /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 p-2 border border-dark my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 text-light my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "player-1-name",
    className: "col-12 col-form-label"
  }, "Player 1 Name"), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("input", {
    name: "player1Name",
    type: "text",
    className: "form-control bg-dark text-light border-0",
    id: "player-1-name",
    placeholder: "Player 1 Name",
    value: props.firstParticipantName,
    onChange: function onChange(event) {
      props.setFirstParticipantName(event.currentTarget.value);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 text-light my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "player-1-ign",
    className: "col-12 col-form-label"
  }, "Player 1 IGN (In Game Name) ", /*#__PURE__*/React.createElement("span", {
    className: "text-danger"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("input", {
    name: "player1Ign",
    type: "text",
    className: "form-control bg-dark text-light border-0",
    id: "player-1-ign",
    placeholder: "Player 1 IGN",
    value: props.firstParticipantIgn,
    onChange: function onChange(event) {
      props.setFirstParticipantIgn(event.currentTarget.value);
    }
  }))))) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  }), props.playerCount >= 2 ? /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 p-2 border border-dark my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 text-light my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "player-2-name",
    className: "col-12 col-form-label"
  }, "Player 2 Name"), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("input", {
    name: "player2Name",
    type: "text",
    className: "form-control bg-dark text-light border-0",
    id: "player-2-name",
    placeholder: "Player 2 Name",
    value: props.secondParticipantName,
    onChange: function onChange(event) {
      props.setSecondParticipantName(event.currentTarget.value);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 text-light my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "player-2-ign",
    className: "col-12 col-form-label"
  }, "Player 2 IGN (In Game Name) ", /*#__PURE__*/React.createElement("span", {
    className: "text-danger"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("input", {
    name: "player2Ign",
    type: "text",
    className: "form-control bg-dark text-light border-0",
    id: "player-2-ign",
    placeholder: "Player 2 IGN",
    value: props.secondParticipantIgn,
    onChange: function onChange(event) {
      props.setSecondParticipantIgn(event.currentTarget.value);
    }
  }))))) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  }), props.playerCount >= 3 ? /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 p-2 border border-dark my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 text-light my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "player-3-name",
    className: "col-12 col-form-label"
  }, "Player 3 Name"), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("input", {
    name: "player3Name",
    type: "text",
    className: "form-control bg-dark text-light border-0",
    id: "player-3-name",
    placeholder: "Player 3 Name",
    value: props.thirdParticipantName,
    onChange: function onChange(event) {
      props.setThirdParticipantName(event.currentTarget.value);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 text-light my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "player-3-ign",
    className: "col-12 col-form-label"
  }, "Player 3 IGN (In Game Name) ", /*#__PURE__*/React.createElement("span", {
    className: "text-danger"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("input", {
    name: "player3Ign",
    type: "text",
    className: "form-control bg-dark text-light border-0",
    id: "player-3-ign",
    placeholder: "Player 3 IGN",
    value: props.thirdParticipantIgn,
    onChange: function onChange(event) {
      props.setThirdParticipantIgn(event.currentTarget.value);
    }
  }))))) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  }), props.playerCount >= 4 ? /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 p-2 border border-dark my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 text-light my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "player-4-name",
    className: "col-12 col-form-label"
  }, "Player 4 Name"), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("input", {
    name: "player4Name",
    type: "text",
    className: "form-control bg-dark text-light border-0",
    id: "player-4-name",
    placeholder: "Player 4 Name",
    value: props.fourthParticipantName,
    onChange: function onChange(event) {
      props.setFourthParticipantName(event.currentTarget.value);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 text-light my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "player-4-ign",
    className: "col-12 col-form-label"
  }, "Player 4 IGN (In Game Name) ", /*#__PURE__*/React.createElement("span", {
    className: "text-danger"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("input", {
    name: "player4Ign",
    type: "text",
    className: "form-control bg-dark text-light border-0",
    id: "player-4-ign",
    placeholder: "Player 4 IGN",
    value: props.fourthParticipantIgn,
    onChange: function onChange(event) {
      props.setFourthParticipantIgn(event.currentTarget.value);
    }
  }))))) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  }));
  return element;
}