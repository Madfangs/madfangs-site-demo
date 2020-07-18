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

function FriendsList(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: "lead text-center my-3 d-block w-100"
  }, "Your friends list"), props.data.map(function (person) {
    return /*#__PURE__*/React.createElement("a", {
      href: props.domain + "dashboard/" + person.username,
      className: "d-block col-12 friend-card border border-dark p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row d-flex flex-wrap align-items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "friend-card-img ml-1"
    }, /*#__PURE__*/React.createElement("img", {
      src: person.imageLink,
      alt: person.username + " image",
      className: "friend-card-img-file"
    })), /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement("p", {
      className: "lead text-light m-0"
    }, person.firstName, " ", person.lastName, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "text-muted small"
    }, "@", person.username)))));
  }));
  return element;
}

function IgnItem(props) {
  var element = /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  });

  if (props.item.ign) {
    // SAFE GUARD //
    element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, props.rowCount), /*#__PURE__*/React.createElement("td", null, props.item.ign), /*#__PURE__*/React.createElement("td", null, props.item.game.name)));
  }

  return element;
}

function Search(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "d-block d-lg-none"
  }, /*#__PURE__*/React.createElement(SocialBlock, {
    domain: props.domain,
    addFriend: props.addFriend,
    searchData: props.searchData,
    fetchSearchData: props.fetchSearchData,
    searchInputRef: props.searchInputRef,
    username: props.username
  }));
  return element;
}

function Settings(props) {
  var ignRef = React.useRef();
  var gameRef = React.useRef(); /// function ///

  function intermediateAddIgnData(event) {
    var keyValue = event.which || event.keyCode;

    if (keyValue === 13) {
      addIgnData();
    }
  }

  function addIgnData() {
    var newIgn = ignRef.current.value;
    ignRef.current.value = '';
    var forGameId = gameRef.current.value;
    var gameName;
    props.games.map(function (game) {
      if (game.id === forGameId) {
        gameName = game.name;
      }
    });
    var ignData = {
      ign: newIgn,
      game: {
        name: gameName,
        id: forGameId
      }
    };
    props.handleIgnList(ignData, props.domain, props.username);
  }

  function handleClickOnInput(event) {
    var keyValue = event.which || event.keyCode;
    if (keyValue === 13) props.handleProfileEditForm(props.domain, props.username);
    return;
  } //////////////////


  var rowCount = 0;
  var element = /*#__PURE__*/React.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-100"
  }, /*#__PURE__*/React.createElement("a", {
    href: props.domain + "logout",
    className: "d-block w-100",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-settings"
  }, "Logout"))), /*#__PURE__*/React.createElement("h3", {
    className: "lead text-light text-center my-3"
  }, "Update Profile"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap my-2"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "first-name",
    className: "col-12 col-lg-6 text-muted"
  }, "First Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "col-12 col-lg-6 form-control bg-dark text-light border-dark",
    id: "first-name",
    name: "firstName",
    ref: props.firstNameRef,
    value: props.firstNameForEdit,
    onKeyDown: handleClickOnInput,
    onChange: props.handleFirstNameForEdit,
    placeholder: "First Name",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap my-2"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "last-name",
    className: "col-12 col-lg-6 text-muted"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "col-12 col-lg-6 form-control bg-dark text-light border-dark",
    id: "last-name",
    name: "lastName",
    ref: props.lastNameRef,
    value: props.lastNameForEdit,
    onKeyDown: handleClickOnInput,
    onChange: props.handleLastNameForEdit,
    placeholder: "Last Name",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap my-2"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "username",
    className: "col-12 col-lg-6 text-muted"
  }, "Username"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "col-12 col-lg-6 form-control bg-dark text-light border-dark",
    id: "username",
    placeholder: props.username,
    readOnly: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap my-2"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "email",
    className: "col-12 col-lg-6 text-muted"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    className: "col-12 col-lg-6 form-control bg-dark text-light border-dark",
    id: "email",
    placeholder: props.email,
    readOnly: true
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-settings",
    type: "button",
    onClick: function onClick() {
      props.handleProfileEditForm(props.domain, props.username);
    }
  }, "Update")), /*#__PURE__*/React.createElement("h3", {
    className: "lead text-center my-3 text-light"
  }, "In Game Name (IGN)"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted text-center"
  }, "You need to add your In Game Name (IGN) before you start playing with us."), /*#__PURE__*/React.createElement("table", {
    className: "table table-dark"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "SN"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "IGN"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Game"))), /*#__PURE__*/React.createElement("tbody", null, props.ignList.map(function (item) {
    rowCount++;
    return /*#__PURE__*/React.createElement(IgnItem, {
      key: item.game.id,
      item: item,
      rowCount: rowCount
    });
  }), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "row"
  }, function () {
    rowCount++;
    return rowCount;
  }()), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    className: "form-control border-0 text-light bg-dark",
    placeholder: "IGN",
    ref: ignRef,
    onKeyDown: intermediateAddIgnData
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
    className: "form-control border-0 text-light bg-dark",
    ref: gameRef
  }, props.games.map(function (game, index) {
    if (index === 0) return /*#__PURE__*/React.createElement("option", {
      key: game.name,
      value: game.id,
      selected: true
    }, game.name);
    return /*#__PURE__*/React.createElement("option", {
      key: game.name,
      value: game.id
    }, game.name);
  })))))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-settings",
    type: "button",
    onClick: addIgnData
  }, "Add IGN"));
  return element;
}

function People(props) {
  var element;

  if (props.numOfFriends && props.numOfFriends > 0) {
    // MAKE AJAX CALL //
    var x = new XMLHttpRequest();

    x.onreadystatechange = function () {
      if (x.readyState == 4 && x.status == 200) {
        var data = x.response;
        props.handleFriendsList(data);
      }
    };

    x.open('get', props.domain + 'dashboard/' + props.username + '/friends', true);
    x.send(); // DISPLAY ELEMENT //

    element = /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap justify-content-around align-items-center w-100"
    }, props.friendsList.length === 0 ? /*#__PURE__*/React.createElement(Loading, null) : /*#__PURE__*/React.createElement(FriendsList, {
      data: JSON.parse(props.friendsList),
      domain: props.domain
    }));
  } else {
    element = /*#__PURE__*/React.createElement("div", {
      className: "text-muted text-center d-block my-5 py-5"
    }, "You have no friends");
  }

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

function ProfileNav(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "d-flex w-100 justify-content-around align-items-center mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col text-center profile-nav",
    onClick: props.setProfileNavTabDetails
  }, props.profileNavTab === 'details' ? /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/details.svg",
    alt: "details",
    className: "profile-nav-icon profile-nav-icon-active"
  }) : /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/details.svg",
    alt: "details",
    className: "profile-nav-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col text-center profile-nav",
    onClick: props.setProfileNavTabPeople
  }, props.profileNavTab === 'people' ? /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/people.svg",
    alt: "people",
    className: "profile-nav-icon profile-nav-icon-active"
  }) : /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/people.svg",
    alt: "people",
    className: "profile-nav-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col text-center profile-nav",
    onClick: props.setProfileNavTabSettings
  }, props.profileNavTab === 'settings' ? /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/settings.svg",
    alt: "settings",
    className: "profile-nav-icon profile-nav-icon-active",
    id: "cog-rotate"
  }) : /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/settings.svg",
    alt: "settings",
    className: "profile-nav-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col text-center profile-nav d-block d-lg-none",
    onClick: props.setProfileNavTabSearch
  }, props.profileNavTab === 'search' ? /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/search.svg",
    alt: "search",
    className: "profile-nav-icon profile-nav-icon-active"
  }) : /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/search.svg",
    alt: "search",
    className: "profile-nav-icon"
  })));
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

function FriendsInfoCard(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "col-12 py-4 px-2 mt-3 mb-1 profile-info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-tems-center flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center para-sm-custom"
  }, /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/people.svg",
    alt: "people",
    className: "inline-icon"
  }), /*#__PURE__*/React.createElement("span", null, "You are friends with ", props.numOfFriends, " people. ")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm-custom",
    onClick: props.setProfileNavTabPeople
  }, "Check List")));
  return element;
}

function WalletInfoCard(props) {
  function walletRedirect() {
    window.location.href = props.domain + "wallet";
  }

  var element = /*#__PURE__*/React.createElement("div", {
    className: "col-12 py-4 px-2 mt-3 mb-1 profile-info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-tems-center flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center para-sm-custom"
  }, /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/wallet.svg",
    alt: "wallet",
    className: "inline-icon"
  }), /*#__PURE__*/React.createElement("span", null, "Account balance : ", props.balance, " ", props.currency)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm-custom",
    onClick: walletRedirect
  }, "Add Money")));
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
  }()), props.editable ? /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  }) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary d-block mx-auto"
  }, "Add Friend")), props.editable ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WalletInfoCard, {
    domain: props.domain,
    balance: props.accountBalance,
    currency: props.accountCurrency
  }), /*#__PURE__*/React.createElement(FriendsInfoCard, {
    domain: props.domain,
    numOfFriends: props.numOfFriends,
    setProfileNavTabPeople: props.setProfileNavTabPeople
  })) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  })), props.editable ? /*#__PURE__*/React.createElement(ProfileNav, {
    domain: props.domain,
    profileNavTab: props.profileNavTab,
    setProfileNavTabDetails: props.setProfileNavTabDetails,
    setProfileNavTabPeople: props.setProfileNavTabPeople,
    setProfileNavTabSettings: props.setProfileNavTabSettings,
    setProfileNavTabSearch: props.setProfileNavTabSearch
  }) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  }), function () {
    if (props.profileNavTab === 'details') {
      return /*#__PURE__*/React.createElement(Details, {
        exp: props.exp
      });
    } else if (props.profileNavTab === 'people') {
      return /*#__PURE__*/React.createElement(People, {
        numOfFriends: props.numOfFriends,
        domain: props.domain,
        friendsList: props.friendsList,
        handleFriendsList: props.handleFriendsList,
        username: props.username
      });
    } else if (props.profileNavTab === 'settings') {
      return /*#__PURE__*/React.createElement(Settings, {
        domain: props.domain,
        firstName: props.firstName,
        lastName: props.lastName,
        username: props.username,
        email: props.email,
        handleFirstName: props.handleFirstName,
        handleLastName: props.handleLastName,
        games: props.games,
        ignEntryNumber: props.ignEntryNumber,
        handleIgnEntryNumber: props.handleIgnEntryNumber,
        ignList: props.ignList,
        handleIgnList: props.handleIgnList,
        firstNameRef: props.firstNameRef,
        lastNameRef: props.lastNameRef,
        handleFirstNameForEdit: props.handleFirstNameForEdit,
        handleLastNameForEdit: props.handleLastNameForEdit,
        firstNameForEdit: props.firstNameForEdit,
        lastNameForEdit: props.lastNameForEdit,
        handleProfileEditForm: props.handleProfileEditForm
      });
    } else if (props.profileNavTab === 'search') {
      return /*#__PURE__*/React.createElement(Search, {
        domain: props.domain,
        addFriend: props.addFriend,
        searchData: props.searchData,
        fetchSearchData: props.fetchSearchData,
        searchInputRef: props.searchInputRef,
        username: props.username
      });
    }
  }())), /*#__PURE__*/React.createElement("div", {
    className: "col-3 d-none d-lg-block"
  }, /*#__PURE__*/React.createElement(SocialBlock, {
    domain: props.domain,
    addFriend: props.addFriend,
    searchData: props.searchData,
    fetchSearchData: props.fetchSearchData,
    searchInputRef: props.searchInputRef,
    username: props.username
  })));
  return element;
}