"use strict";

function MainBlock(props) {
  var element,
      i = window.pageYOffset,
      scrolling = false;
  var formUrl = props.domain + "tournament/tid/" + props.tid + "/register";

  if (props.t !== "") {
    formUrl += "?t=" + props.t;
    console.log("worked");
  } // window.onscroll = ()=>{
  //     if (!scrolling)
  //         i = window.pageYOffset;
  // }


  function scrollToRegisterForm() {
    var rect = props.registerForm.current.getBoundingClientRect();
    var scrollValue = rect.top; // animateScrollRegisterForm(scrollValue - 90);

    window.scrollTo(0, scrollValue - 90);
  } // function animateScrollRegisterForm (position) {
  //     console.log(i, position, i < position);
  //     if (i < position) {
  //         scrolling = true;
  //         requestAnimationFrame(animateScrollRegisterForm);
  //         window.scrollTo(0, i);
  //         i+=20;
  //     } else {
  //         scrolling = false;
  //         i = window.pageYOffset;
  //         window.scrollTo(0, position);
  //         console.log("stopped");
  //     }
  // }


  if (!props.tourneyDetails.tid) {
    element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "container p-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 text-center my-5 text-muted"
    }, "Loading ...")));
  } else {
    var game = props.tourneyDetails.game.toString().trim() || "pubgm";
    var days = ["Sunday", "Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var tournamentName = props.tourneyDetails.tournamentName.toString().trim() || toUpperCase(game) + " Tournament",
        entryFees = parseInt(props.tourneyDetails.entryFees),
        slots = parseInt(props.tourneyDetails.slots),
        slotsMax = parseInt(props.tourneyDetails.slotsMax),
        tid = parseInt(props.tourneyDetails.tid),
        dateAndTime = new Date(props.tourneyDetails.dateAndTime),
        mapName = props.tourneyDetails.mapName.toString().trim(),
        gameType = props.tourneyDetails.gameType.toString().trim(),
        gameMode = props.tourneyDetails.gameMode.toString().trim(),
        rewards = props.tourneyDetails.rewards,
        state = props.tourneyDetails.state.toString().trim();
    var hour = parseInt(dateAndTime.getHours()),
        minutes = dateAndTime.getMinutes(),
        timeSubfix = "AM";

    if (hour > 12) {
      timeSubfix = "PM";
      hour -= 12;
    }

    element = /*#__PURE__*/React.createElement("div", {
      className: "container p-2"
    }, /*#__PURE__*/React.createElement("div", {
      "class": "d-block w-100 py-4"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-light text-center mb-2"
    }, tournamentName), function () {
      if (entryFees <= 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "text-center text-success py-2"
        }, "Free Entry");
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: "text-center text-success py-2"
        }, "Entry Fees : \u20B9", entryFees);
      }
    }(), function () {
      if (slots === slotsMax) return /*#__PURE__*/React.createElement("div", {
        "class": "text-success text-center mb-2"
      }, "Slots Full!");else return /*#__PURE__*/React.createElement("div", {
        "class": "text-light text-center mb-2"
      }, "Slots : ", slots, " / ", slotsMax);
    }()), /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 my-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 p-2 m-auto border border-dark",
      style: {
        maxWidth: "550px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "lead text-light text-center mb-3"
    }, "Tournament Details"), /*#__PURE__*/React.createElement("p", {
      className: "text-light"
    }, "Date : ", /*#__PURE__*/React.createElement("span", {
      className: "text-info"
    }, dateAndTime.getDate(), " ", months[dateAndTime.getMonth()], " , ", dateAndTime.getFullYear()), " ", /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, " (", days[dateAndTime.getDay()], ")"), /*#__PURE__*/React.createElement("br", null), "Time : ", /*#__PURE__*/React.createElement("span", {
      className: "text-info"
    }, hour === 0 ? "00" : hour, " : ", minutes === 0 ? "00" : minutes, " ", timeSubfix), /*#__PURE__*/React.createElement("br", null), mapName === "default" ? /*#__PURE__*/React.createElement("span", {
      className: "d-none"
    }) : /*#__PURE__*/React.createElement(React.Fragment, null, "Map : ", /*#__PURE__*/React.createElement("span", {
      className: "text-info"
    }, mapName), /*#__PURE__*/React.createElement("br", null)), "Game : ", /*#__PURE__*/React.createElement("span", {
      className: "text-info"
    }, game), /*#__PURE__*/React.createElement("br", null), "Game Mode : ", /*#__PURE__*/React.createElement("span", {
      className: "text-info"
    }, gameMode), /*#__PURE__*/React.createElement("br", null), "Game Type : ", /*#__PURE__*/React.createElement("span", {
      className: "text-info"
    }, gameType), /*#__PURE__*/React.createElement("br", null)), slots == slotsMax || state !== "active" ? /*#__PURE__*/React.createElement("button", {
      className: "btn btn-block btn-success",
      disabled: true
    }, "Register") : /*#__PURE__*/React.createElement("button", {
      className: "btn btn-block btn-success",
      onClick: scrollToRegisterForm
    }, "Register"))), /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 p-2 my-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 lead text-light text-center mb-2"
    }, "Rewards"), /*#__PURE__*/React.createElement("table", {
      className: "table table-dark text-center"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Position"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Reward"))), /*#__PURE__*/React.createElement("tbody", null, rewards.map(function (reward) {
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, reward.position.toString().trim()), /*#__PURE__*/React.createElement("td", null, reward.reward.toString().trim()));
    })))), /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 p-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 m-auto",
      style: {
        maxWidth: "800px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-light text-center d-block w-100 lead p-2"
    }, "Rules"), /*#__PURE__*/React.createElement("p", {
      className: "text-light"
    }, "1. No Emulators are allowed.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "2. Cheating in any shape or form is a bannable offence. We will take strict actions against players who cheat in the tournaments. Cheating includes but is not limited to, using emulators, using aimbots, using hacks, stream sniping etc.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "3. The custom room ID and password will be sent to you by personally contacting you using your contact information. If you are playing with a team, share it with your team-mates and no one else.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "4. The tournament fixtures and the exact date and time for each match will be informed by us using your contact information you provide us with.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "5. If you win the tournament, we will contact you using your contact information and we will arrange to provide you, your reward. A reward confirmation is always provided by us on our Instagram Account (", /*#__PURE__*/React.createElement("a", {
      href: "https://www.instagram.com/madfangs.sports/"
    }, "Click here to visit"), ")", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "6. The tournaments will start on time. Please join the room 15 mins prior to the starting time. Any loss due to you not being on time will not be covered by Madfangs."))), /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 p-2 m-auto mb-3 border border-dark",
      style: {
        maxWidth: "800px"
      },
      ref: props.registerForm
    }, /*#__PURE__*/React.createElement("h3", {
      className: "d-block w-100 text-center text-light pb-3"
    }, "Register"), /*#__PURE__*/React.createElement("form", {
      action: formUrl,
      method: "post"
    }, gameType != "solo" ? /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 text-light my-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      "for": "team-name",
      className: "col-12 col-form-label"
    }, "Team Name ", /*#__PURE__*/React.createElement("span", {
      className: "text-danger"
    }, "*")), /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("input", {
      name: "teamName",
      type: "text",
      className: "form-control bg-dark text-light border-0",
      id: "team-name",
      placeholder: "Team Name",
      value: props.teamName,
      onChange: function onChange(event) {
        props.setTeamName(event.currentTarget.value);
      }
    })))) : /*#__PURE__*/React.createElement("span", {
      className: "d-none"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Participants, {
      setParticipants: props.setParticipants,
      playerCount: props.playerCount,
      handleParticipantsInput: props.handleParticipantsInput,
      firstParticipantName: props.firstParticipantName,
      secondParticipantName: props.secondParticipantName,
      thirdParticipantName: props.thirdParticipantName,
      fourthParticipantName: props.fourthParticipantName,
      firstParticipantIgn: props.firstParticipantIgn,
      secondParticipantIgn: props.secondParticipantIgn,
      thirdParticipantIgn: props.thirdParticipantIgn,
      fourthParticipantIgn: props.fourthParticipantIgn,
      setFirstParticipantIgn: props.setFirstParticipantIgn,
      setSecondParticipantIgn: props.setSecondParticipantIgn,
      setThirdParticipantIgn: props.setThirdParticipantIgn,
      setFourthParticipantIgn: props.setFourthParticipantIgn,
      setFirstParticipantName: props.setFirstParticipantName,
      setSecondParticipantName: props.setSecondParticipantName,
      setThirdParticipantName: props.setThirdParticipantName,
      setFourthParticipantName: props.setFourthParticipantName
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 text-light my-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      "for": "email-id",
      className: "col-12 col-form-label"
    }, "Email ID ", /*#__PURE__*/React.createElement("span", {
      className: "text-danger"
    }, "*")), /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("input", {
      name: "emailID",
      type: "email",
      className: "form-control bg-dark text-light border-0",
      id: "email-id",
      placeholder: "Email ID",
      value: props.emailID,
      onChange: function onChange(event) {
        props.setEmailID(event.currentTarget.value);
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "d-block w-100 text-light my-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      "for": "contact-info",
      className: "col-12 col-form-label"
    }, "Contact Number (WhatsApp preferred) ", /*#__PURE__*/React.createElement("span", {
      className: "text-danger"
    }, "*")), /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("input", {
      name: "contactInfo",
      type: "number",
      className: "form-control bg-dark text-light border-0",
      id: "contact-info",
      placeholder: "Contact Number",
      value: props.contactInfo,
      onChange: function onChange(event) {
        props.setContactInfo(event.currentTarget.value);
      }
    })), /*#__PURE__*/React.createElement("small", {
      className: "d-block w-100 text-muted px-3"
    }, "*Please enter a valid contact number. We won't be able to send you the Custom Room ID and password if we cannot contact you. (WhatsApp phone number is preferred). In case you face any issues, please contact ", /*#__PURE__*/React.createElement("span", {
      className: "text-info"
    }, "+918399012435"), "."))), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      className: "d-none",
      name: "tid",
      value: props.tid
    }), slots == slotsMax || state !== "active" ? /*#__PURE__*/React.createElement("button", {
      className: "btn btn-block btn-success mt-5 mb-3",
      onClick: props.handleRegister,
      type: "submit",
      disabled: true
    }, "Register") : /*#__PURE__*/React.createElement("button", {
      className: "btn btn-block btn-success mt-5 mb-3",
      onClick: props.handleRegister,
      type: "submit"
    }, "Register"))));
  }

  return element;
}