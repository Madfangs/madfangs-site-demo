"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Main() {
  var _React$useState = React.useState(data.notifications),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      notifications = _React$useState2[0],
      setNotifications = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      numOfNotifications = _React$useState4[0],
      setNumOfNotifications = _React$useState4[1];

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

  function handleNotificationRemove(nid, domain) {
    var newNotifications = [];
    var url = domain + 'notifications/remove/' + nid;
    notifications.map(function (notif) {
      if (notif.nid !== nid) {
        newNotifications.push(notif);
      }
    });
    fetch(url).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.msg) {
        if (data.err === true) alert("An error has occured. Msg : ".concat(data.msg));else alert(data.msg);
      } else {
        if (data.removed) setNotifications(newNotifications);else alert("Failed to remove notification! Please try again later.");
      }
    })["catch"](function (err) {
      console.log(err);
      alert("Something is wrong! Error -> " + err);
    });
  }

  function handleFriendRequestResponse(response, username, domain, nid) {
    var url = domain + 'notifications/friendrequest/' + username + '/' + response + '?nid=' + nid;
    fetch(url).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.msg) {
        if (data.err === true) alert("An error has occured. Msg : ".concat(data.msg));else alert(data.msg);
      } else {
        if (data.done) {
          var newNotifications = [];
          notifications.map(function (notif) {
            if (notif.nid !== nid) newNotifications.push(notif);else {
              var newObj = _objectSpread(_objectSpread({}, notif), {}, {
                request: data.request
              });

              newNotifications.push(newObj);
            }
          });
          setNotifications(newNotifications);
        } else alert("Failed to ".concat(response, " friend request. Please try again later."));
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
    notifications: notifications,
    handleNotificationRemove: handleNotificationRemove,
    handleFriendRequestResponse: handleFriendRequestResponse
  }))))));
  return element;
}

ReactDOM.render( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Main, null)), document.getElementById('root'));