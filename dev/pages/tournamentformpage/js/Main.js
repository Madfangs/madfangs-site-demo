"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Main() {
  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tourneyDetails = _React$useState2[0],
      setTourneyDetails = _React$useState2[1];

  var _React$useState3 = React.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      teamName = _React$useState4[0],
      setTeamName = _React$useState4[1];

  var _React$useState5 = React.useState(""),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      contactInfo = _React$useState6[0],
      setContactInfo = _React$useState6[1];

  var _React$useState7 = React.useState(""),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      emailID = _React$useState8[0],
      setEmailID = _React$useState8[1];

  var _React$useState9 = React.useState(0),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      playerCount = _React$useState10[0],
      setPlayerCount = _React$useState10[1];

  var _React$useState11 = React.useState(""),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      t = _React$useState12[0],
      setT = _React$useState12[1];

  var _React$useState13 = React.useState(""),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      firstParticipantName = _React$useState14[0],
      setFirstParticipantName = _React$useState14[1];

  var _React$useState15 = React.useState(""),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      firstParticipantIgn = _React$useState16[0],
      setFirstParticipantIgn = _React$useState16[1];

  var _React$useState17 = React.useState(""),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      secondParticipantName = _React$useState18[0],
      setSecondParticipantName = _React$useState18[1];

  var _React$useState19 = React.useState(""),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      secondParticipantIgn = _React$useState20[0],
      setSecondParticipantIgn = _React$useState20[1];

  var _React$useState21 = React.useState(""),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      thirdParticipantName = _React$useState22[0],
      setThirdParticipantName = _React$useState22[1];

  var _React$useState23 = React.useState(""),
      _React$useState24 = _slicedToArray(_React$useState23, 2),
      thirdParticipantIgn = _React$useState24[0],
      setThirdParticipantIgn = _React$useState24[1];

  var _React$useState25 = React.useState(""),
      _React$useState26 = _slicedToArray(_React$useState25, 2),
      fourthParticipantName = _React$useState26[0],
      setFourthParticipantName = _React$useState26[1];

  var _React$useState27 = React.useState(""),
      _React$useState28 = _slicedToArray(_React$useState27, 2),
      fourthParticipantIgn = _React$useState28[0],
      setFourthParticipantIgn = _React$useState28[1];

  var _React$useState29 = React.useState(0),
      _React$useState30 = _slicedToArray(_React$useState29, 2),
      numOfNotifications = _React$useState30[0],
      setNumOfNotifications = _React$useState30[1];

  var registerForm = React.useRef();
  React.useEffect(function () {
    function getDetails() {
      var url = data.domainName + "tournament/tid/" + data.tid + "/details";
      fetch(url).then(function (file) {
        return file.json();
      }).then(function (file) {
        if (file.msg) {
          if (file.err) alert("An error has occured! msg : " + file.msg);else alert(file.msg);
        } else {
          setTourneyDetails(file);

          if (file.gameType === "solo") {
            setPlayerCount(1);
          } else if (file.gameType === "duo") {
            setPlayerCount(2);
          } else if (file.gameType === "trio") {
            setPlayerCount(3);
          } else if (file.gameType === "squad") {
            setPlayerCount(4);
          }
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }

    initializeT();
    setTimeout(getDetails, 500);
  }, []);

  function handleRegister(event) {
    var url = data.domainName + "tournament/tid/" + data.tid + "/register",
        dataToBeSent = {}; // check information

    if (playerCount != 1 && teamName === "" || contactInfo === "" || emailID === "") {
      event.preventDefault();
      alert("Please fill up all the fields!");
      return;
    }

    if (playerCount === 1) {
      if (firstParticipantIgn === "") {
        event.preventDefault();
        alert("Please fill up all the fields!");
        return;
      }
    }

    if (playerCount === 2) {
      if (firstParticipantIgn === "" || secondParticipantIgn === "") {
        event.preventDefault();
        alert("Please fill up all the fields!");
        return;
      }
    }

    if (playerCount === 3) {
      if (firstParticipantIgn === "" || secondParticipantIgn === "" || thirdParticipantIgn === "") {
        event.preventDefault();
        alert("Please fill up all the fields!");
        return;
      }
    }

    if (playerCount === 4) {
      if (firstParticipantIgn === "" || secondParticipantIgn === "" || thirdParticipantIgn === "" || fourthParticipantIgn === "") {
        event.preventDefault();
        alert("Please fill up all the fields!");
        return;
      }
    }
  }

  function initializeT() {
    if (data.t && data.t !== "") {
      setT(data.t);
    }
  }

  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    navigationFull: data.navigationFull,
    activeNav: data.activeNav,
    domain: data.domainName,
    numOfNotifications: numOfNotifications
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-3 col-lg-2 d-none d-md-block"
  }, /*#__PURE__*/React.createElement(SideNavigation, {
    active: data.activeNav,
    navs: data.navigationFull,
    domain: data.domainName
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-md-9 col-lg-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row text-light"
  }, /*#__PURE__*/React.createElement(MainBlock, {
    domain: data.domainName,
    tid: data.tid,
    playerCount: playerCount,
    tourneyDetails: tourneyDetails,
    teamName: teamName,
    emailID: emailID,
    contactInfo: contactInfo,
    setTeamName: setTeamName,
    setContactInfo: setContactInfo,
    setEmailID: setEmailID,
    firstParticipantName: firstParticipantName,
    secondParticipantName: secondParticipantName,
    thirdParticipantName: thirdParticipantName,
    fourthParticipantName: fourthParticipantName,
    firstParticipantIgn: firstParticipantIgn,
    secondParticipantIgn: secondParticipantIgn,
    thirdParticipantIgn: thirdParticipantIgn,
    fourthParticipantIgn: fourthParticipantIgn,
    t: t,
    setFirstParticipantIgn: setFirstParticipantIgn,
    setSecondParticipantIgn: setSecondParticipantIgn,
    setThirdParticipantIgn: setThirdParticipantIgn,
    setFourthParticipantIgn: setFourthParticipantIgn,
    setFirstParticipantName: setFirstParticipantName,
    setSecondParticipantName: setSecondParticipantName,
    setThirdParticipantName: setThirdParticipantName,
    setFourthParticipantName: setFourthParticipantName,
    handleRegister: handleRegister,
    registerForm: registerForm
  }))))));
  return element;
}

ReactDOM.render( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Main, null)), document.getElementById('root'));