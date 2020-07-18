"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Main() {
  var _React$useState = React.useState('details'),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      profileNavTab = _React$useState2[0],
      setProfileNavTab = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      friendsList = _React$useState4[0],
      setFriendsList = _React$useState4[1];

  var _React$useState5 = React.useState(data.firstName),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      firstName = _React$useState6[0],
      setFirstName = _React$useState6[1];

  var _React$useState7 = React.useState(data.lastName),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      lastName = _React$useState8[0],
      setLastName = _React$useState8[1];

  var _React$useState9 = React.useState(data.firstName),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      firstNameForEdit = _React$useState10[0],
      setFirstNameForEdit = _React$useState10[1];

  var _React$useState11 = React.useState(data.lastName),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      lastNameForEdit = _React$useState12[0],
      setLastNameForEdit = _React$useState12[1];

  var _React$useState13 = React.useState(1),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      ignEntryNumber = _React$useState14[0],
      setIgnEntryNumber = _React$useState14[1];

  var _React$useState15 = React.useState(data.ignList),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      ignList = _React$useState16[0],
      setIgnList = _React$useState16[1];

  var _React$useState17 = React.useState([]),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      searchData = _React$useState18[0],
      setSearchData = _React$useState18[1];

  var _React$useState19 = React.useState(0),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      numOfNotifications = _React$useState20[0],
      setNumOfNotifications = _React$useState20[1];

  var firstNameRef = React.useRef();
  var lastNameRef = React.useRef();
  var searchInputRef = React.useRef();

  function fetchNumOfNotifications() {
    var url = data.domainName + 'notifications/numofnotifications';
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        async: true
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(function (file) {
      return file.json();
    }).then(function (file) {
      if (file.msg) {
        if (file.err) alert("An Error has occured. Msg : " + file.msg);else alert(file.msg);
      } else setNumOfNotifications(file.numOfNotifications);
    })["catch"](function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  React.useEffect(function () {
    fetchNumOfNotifications();
    setInterval(fetchNumOfNotifications, 10000);
  }, []);

  function setProfileNavTabDetails() {
    setProfileNavTab('details');
  }

  function setProfileNavTabPeople() {
    setProfileNavTab('people');
  }

  function setProfileNavTabSettings() {
    setProfileNavTab('settings');
  }

  function setProfileNavTabSearch() {
    setProfileNavTab('search');
  }

  function handleFriendsList(data) {
    if (setFriendsList(data)) {
      return true;
    }

    return false;
  }

  function handleFirstNameForEdit(event) {
    setFirstNameForEdit(event.currentTarget.value);
  }

  function handleLastNameForEdit(event) {
    setLastNameForEdit(event.currentTarget.value);
  }

  function handleIgnEntryNumber() {
    setIgnEntryNumber(ignEntryNumber + 1);
  }

  function handleIgnList(data, domain, username) {
    if (data.ign.length < 3) {
      alert("IGN too small.");
      return;
    }

    if (data.ign.length > 255) {
      alert("IGN cannot be longer than 255 characters");
      return;
    }

    var ignData = [].concat(_toConsumableArray(ignList), [data]);
    var url = domain + 'dashboard/' + username + '/ign-update';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(ignData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.err && data.msg) {
        if (data.err === true) alert("An error has occured. Msg : ".concat(data.msg));else alert("Oops! Something is wrong");
      } else {
        setIgnList(data);
      }
    })["catch"](function (err) {
      console.log(err);
      alert("Something is wrong! Error -> " + err);
    });
  }

  function handleProfileEditForm(domain, username) {
    var url = domain + 'dashboard/' + username + '/updateprofile';
    var firstName = firstNameRef.current.value;
    var lastName = lastNameRef.current.value;

    if (firstName.length < 1) {
      alert("Firstname is too short.");
      return;
    }

    if (firstName.length > 255) {
      alert("Firstname cannot be longer than 255 characters.");
      return;
    }

    if (lastName.length < 1) {
      alert("Lastname is too short.");
      return;
    }

    if (lastName.length > 255) {
      alert("Lastname cannot be longer than 255 characters.");
      return;
    }

    var data = {
      firstName: firstName,
      lastName: lastName,
      async: true
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.msg) {
        if (data.err === true) alert("An error has occured. Msg : ".concat(data.msg));else alert("Oops! Something is wrong");
      } else {
        setFirstName(data.firstName);
        setFirstNameForEdit(data.firstName);
        setLastName(data.lastName);
        setLastNameForEdit(data.lastName);
      }
    })["catch"](function (err) {
      console.log(err);
      alert("Something is wrong! Error -> " + err);
    });
  }

  function fetchSearchData(domain, username) {
    var url = domain + 'dashboard/' + username + '/searchuser';
    var searchQuery = searchInputRef.current.value;
    var data = {
      searchQuery: searchQuery
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.msg) {
        if (data.err === true) alert("An error has occured. Msg : ".concat(data.msg));else alert(data.msg);
      } else {
        setSearchData(data);
      }
    })["catch"](function (err) {
      console.log(err);
      alert("Something is wrong! Error -> " + err);
    });
  }

  function addFriend(username, domain) {
    var url = domain + 'dashboard/' + username + '/add-friend';
    fetch(url).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.msg) {
        if (data.err === true) alert("An error has occured. Msg : ".concat(data.msg));else alert(data.msg);
      } else {
        if (data.done) {
          var newArray = [];
          searchData.map(function (card) {
            if (card.username !== username) newArray.push(card);else {
              var newObj = _objectSpread(_objectSpread({}, card), {}, {
                available: false
              });

              newArray.push(newObj);
            }
          });
          setSearchData(newArray);
        }
      }
    })["catch"](function (err) {
      console.log(err);
      alert("Something is wrong! Error -> " + err);
    });
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
    editable: data.editable,
    numOfFriends: data.numOfFriends,
    profileNavTab: profileNavTab,
    friendsList: friendsList,
    setProfileNavTabDetails: setProfileNavTabDetails,
    setProfileNavTabPeople: setProfileNavTabPeople,
    setProfileNavTabSettings: setProfileNavTabSettings,
    setProfileNavTabSearch: setProfileNavTabSearch,
    handleFriendsList: handleFriendsList,
    handleFirstNameForEdit: handleFirstNameForEdit,
    handleLastNameForEdit: handleLastNameForEdit,
    handleProfileEditForm: handleProfileEditForm,
    fetchSearchData: fetchSearchData,
    searchData: searchData,
    exp: data.exp,
    firstName: firstName,
    lastName: lastName,
    firstNameForEdit: firstNameForEdit,
    lastNameForEdit: lastNameForEdit,
    firstNameRef: firstNameRef,
    lastNameRef: lastNameRef,
    searchInputRef: searchInputRef,
    username: data.username,
    email: data.email,
    profileImg: data.profileImg,
    accountBalance: data.accountBalance,
    accountCurrency: data.accountCurrency,
    games: data.games,
    ignEntryNumber: ignEntryNumber,
    handleIgnEntryNumber: handleIgnEntryNumber,
    ignList: ignList,
    handleIgnList: handleIgnList,
    addFriend: addFriend
  }))))));
  return element;
}

ReactDOM.render( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Main, null)), document.getElementById('root'));