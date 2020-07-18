"use strict";

function MainBlock(props) {
  var activeTournaments = props.activeTournaments || [],
      badgeValue = "";
  if (activeTournaments.length > 0) badgeValue = activeTournaments.length;
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-left align-items-center w-100 p-2 mt-2"
  }, props.tourneyTab === "host" ? /*#__PURE__*/React.createElement("div", {
    className: "p-2 text-light text-center tournament-tab tournament-tab-active mx-3",
    onClick: function onClick() {
      return props.setTourneyTab("host");
    }
  }, "Host") : /*#__PURE__*/React.createElement("div", {
    className: "p-2 text-light text-center tournament-tab mx-3",
    onClick: function onClick() {
      props.setTourneyTab("host");
    }
  }, "Host"), props.tourneyTab === "active" ? /*#__PURE__*/React.createElement("div", {
    className: "p-2 text-light text-center tournament-tab tournament-tab-active mx-3",
    onClick: function onClick() {
      props.setTourneyTab("active");
      props.fetchActiveTournaments();
    }
  }, "Active ", /*#__PURE__*/React.createElement("span", {
    className: "ml-1 badge badge-danger"
  }, badgeValue)) : /*#__PURE__*/React.createElement("div", {
    className: "p-2 text-light text-center tournament-tab mx-3",
    onClick: function onClick() {
      props.setTourneyTab("active");
      props.fetchActiveTournaments();
    }
  }, "Active ", /*#__PURE__*/React.createElement("span", {
    className: "ml-1 badge badge-danger"
  }, badgeValue)))), props.tourneyTab === "host" ? /*#__PURE__*/React.createElement(HostATournament, {
    domain: props.domainName,
    games: props.games,
    game: props.game,
    tournamentName: props.tournamentName,
    maxPlayers: props.maxPlayers,
    date: props.date,
    time: props.time,
    gameMode: props.gameMode,
    gameType: props.gameType,
    mapName: props.mapName,
    entryFees: props.entryFees,
    rewards: props.rewards,
    position: props.position,
    reward: props.reward,
    loading: props.loading,
    setData: props.setData,
    setPosition: props.setPosition,
    setReward: props.setReward,
    handleRewards: props.handleRewards,
    sendTournamentData: props.sendTournamentData
  }) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  }), props.tourneyTab === "active" ? /*#__PURE__*/React.createElement(ActiveTournaments, {
    domain: props.domain,
    activeTournaments: props.activeTournaments
  }) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  }));
  return element;
}