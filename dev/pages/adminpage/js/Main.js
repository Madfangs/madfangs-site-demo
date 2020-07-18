"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Main() {
  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      game = _React$useState2[0],
      setGame = _React$useState2[1];

  var _React$useState3 = React.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      tournamentName = _React$useState4[0],
      setTournamentName = _React$useState4[1];

  var _React$useState5 = React.useState(""),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      maxPlayers = _React$useState6[0],
      setMaxPlayers = _React$useState6[1];

  var _React$useState7 = React.useState(""),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      date = _React$useState8[0],
      setDate = _React$useState8[1];

  var _React$useState9 = React.useState(""),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      time = _React$useState10[0],
      setTime = _React$useState10[1];

  var _React$useState11 = React.useState("TPP"),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      gameMode = _React$useState12[0],
      setGameMode = _React$useState12[1];

  var _React$useState13 = React.useState("solo"),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      gameType = _React$useState14[0],
      setGameType = _React$useState14[1];

  var _React$useState15 = React.useState(""),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      mapName = _React$useState16[0],
      setMapName = _React$useState16[1];

  var _React$useState17 = React.useState(""),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      entryFees = _React$useState18[0],
      setEntryFees = _React$useState18[1];

  var _React$useState19 = React.useState([]),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      rewards = _React$useState20[0],
      setRewards = _React$useState20[1];

  var _React$useState21 = React.useState(false),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      loading = _React$useState22[0],
      setLoading = _React$useState22[1];

  var _React$useState23 = React.useState("host"),
      _React$useState24 = _slicedToArray(_React$useState23, 2),
      tourneyTab = _React$useState24[0],
      setTourneyTab = _React$useState24[1];

  var _React$useState25 = React.useState([]),
      _React$useState26 = _slicedToArray(_React$useState25, 2),
      activeTournaments = _React$useState26[0],
      setActiveTournaments = _React$useState26[1];

  var _React$useState27 = React.useState(1),
      _React$useState28 = _slicedToArray(_React$useState27, 2),
      position = _React$useState28[0],
      setPosition = _React$useState28[1];

  var _React$useState29 = React.useState(""),
      _React$useState30 = _slicedToArray(_React$useState29, 2),
      reward = _React$useState30[0],
      setReward = _React$useState30[1];

  var _React$useState31 = React.useState(0),
      _React$useState32 = _slicedToArray(_React$useState31, 2),
      numOfNotifications = _React$useState32[0],
      setNumOfNotifications = _React$useState32[1];

  function resetData() {
    setGame("");
    setTournamentName("");
    setMaxPlayers("");
    setDate("");
    setTime("");
    setGameMode("TPP");
    setGameType("solo");
    setMapName("");
    setEntryFees("");
    setRewards([]);
    setPosition(1);
    setReward("");
  }

  function setData(param, info) {
    if (param === "game") setGame(info);else if (param === "tournamentName") setTournamentName(info);else if (param === "maxPlayers") setMaxPlayers(parseInt(info));else if (param === "date") setDate(info);else if (param === "time") setTime(info);else if (param === "gameMode") setGameMode(info);else if (param === "gameType") setGameType(info);else if (param === "mapName") setMapName(info);else if (param === "entryFees") setEntryFees(parseInt(info));else if (param === "rewards") setRewards(info);
  }

  function handleRewards(event) {
    var key = event.which || event.keyCode;

    if (key === 13) {
      var rewardsList = rewards; // check if position already exists -> update it

      var positionExists = false;

      for (var i = 0; i < rewardsList.length; i++) {
        if (rewardsList[i].position === position) {
          positionExists = true;
          rewardsList[i] = {
            position: position,
            reward: reward
          };
        }
      } // add new element to array


      if (!positionExists) {
        rewardsList.push({
          position: position,
          reward: reward
        });
      } // arrange the array in ascending order of position


      for (var _i2 = rewardsList.length - 1; _i2 >= 0; _i2--) {
        for (var j = 0; j < _i2; j++) {
          if (rewardsList[j].position > rewardsList[j + 1].position) {
            // exchange
            var temp = rewardsList[j];
            rewardsList[j] = rewardsList[j + 1];
            rewardsList[j + 1] = temp;
          }
        }
      } // update the state


      setRewards(rewardsList);
      setPosition(position + 1);
      setReward("");
    }
  }

  function sendTournamentData() {
    var infoToSend = {
      game: game,
      tournamentName: tournamentName,
      maxPlayers: maxPlayers,
      date: date,
      time: time,
      gameMode: gameMode,
      gameType: gameType,
      mapName: mapName,
      entryFees: entryFees,
      rewards: rewards
    };
    setLoading(true); // show the loading screen

    var url = data.domainName + 'admin/new-tournament';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(infoToSend),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(function (file) {
      return file.json();
    }).then(function (file) {
      setLoading(false); // hide the loading screen

      if (file) {
        if (file.msg) {
          if (file.err) alert("An error has occured! " + file.msg);else alert(file.msg);
        } else if (file.done) {
          alert("The tournament has been successfully hosted! Tournament link is " + data.domainName + "tournament/tid/" + file.tid);
          resetData();
          fetchActiveTournaments();
        }
      }
    })["catch"](function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  function fetchActiveTournaments() {
    var url = data.domainName + 'admin/active-tournaments';
    fetch(url).then(function (file) {
      return file.json();
    }).then(function (file) {
      if (file.msg) {
        if (err) {
          alert("An error has occured! Msg : " + file.msg);
        } else {
          alert(file.msg);
        }
      } else {
        setActiveTournaments(file);
      }
    })["catch"](function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  React.useEffect(function () {
    fetchActiveTournaments();
  }, []);
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
    games: data.games,
    game: game,
    tournamentName: tournamentName,
    maxPlayers: maxPlayers,
    date: date,
    time: time,
    gameMode: gameMode,
    gameType: gameType,
    mapName: mapName,
    entryFees: entryFees,
    rewards: rewards,
    position: position,
    reward: reward,
    loading: loading,
    tourneyTab: tourneyTab,
    activeTournaments: activeTournaments,
    setData: setData,
    setPosition: setPosition,
    setReward: setReward,
    handleRewards: handleRewards,
    sendTournamentData: sendTournamentData,
    setTourneyTab: setTourneyTab,
    fetchActiveTournaments: fetchActiveTournaments
  }))))));
  return element;
}

ReactDOM.render( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Main, null)), document.getElementById('root'));