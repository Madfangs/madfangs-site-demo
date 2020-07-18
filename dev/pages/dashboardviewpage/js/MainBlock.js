"use strict";

//// FUNCTION ////
function calcLevel(exp) {
  var expForLevel = 1000;
  var levelCount = 0;
  var leftOverExp = exp;

  while (true) {
    var carry = leftOverExp - expForLevel;

    if (carry >= 0) {
      leftOverExp = carry;
      expForLevel += 500;
      levelCount++;
    } else {
      break;
    }
  }

  return {
    currentLevel: levelCount,
    leftOverExp: leftOverExp,
    expForLevel: expForLevel - 500
  };
} /////////////////


function Loading() {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "text-muted text-center d-block my-5"
  }, /*#__PURE__*/React.createElement("p", null, "Loading..."), /*#__PURE__*/React.createElement("div", {
    className: "lds-ellipsis"
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null)));
  return element;
}

function LevelBar(props) {
  var percentage = props.value / props.max * 100;
  var element = /*#__PURE__*/React.createElement("div", {
    className: "level-progress-bar d-block w-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "level-progress-bar-juice d-block",
    style: {
      width: percentage + '%'
    }
  }));
  return element;
}

function ExperienceCard(props) {
  var levelData = calcLevel(props.exp);
  var element = /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-md-6 p-3 profile-card"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "lead text-center"
  }, "Experience points"), /*#__PURE__*/React.createElement("p", {
    className: "lead text-muted text-center"
  }, "Current level : ", levelData.currentLevel), /*#__PURE__*/React.createElement(LevelBar, {
    value: levelData.leftOverExp,
    max: levelData.expForLevel
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted text-center"
  }, levelData.leftOverExp, " / ", levelData.expForLevel), /*#__PURE__*/React.createElement("p", {
    className: "text-muted"
  }, "You gain experience points by playing scrims"));
  return element;
}

function Details(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap justify-content-around py-4"
  }, /*#__PURE__*/React.createElement(ExperienceCard, {
    exp: props.exp
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-md-6 p-3 profile-card"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "lead text-center"
  }, "Achievements"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted text-center py-5"
  }, "You have made no achievements yet.")));
  return element;
}

function MainBlock(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-lg-9"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap justify-content-around py-5 mb-5 align-items-center profile-main-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-6 col-sm-4 p-0 profile-img-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: props.profileImg,
    alt: "profile picture",
    className: "w-100"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-sm-8 p-2 mb-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "display-5 d-block text-center"
  }, props.firstName, " ", props.lastName), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-muted"
  }, "Username : ", props.username), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-muted"
  }, "Account level : ", function () {
    var levelData = calcLevel(props.exp);
    return levelData.currentLevel;
  }()))), /*#__PURE__*/React.createElement(Details, {
    exp: props.exp
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-3 d-none d-lg-block"
  }, /*#__PURE__*/React.createElement(SocialBlock, {
    domain: props.domain,
    searchData: props.searchData,
    addFriend: props.addFriend,
    available: props.available,
    fetchSearchData: props.fetchSearchData,
    searchInputRef: props.searchInputRef,
    username: props.username
  })));
  return element;
}