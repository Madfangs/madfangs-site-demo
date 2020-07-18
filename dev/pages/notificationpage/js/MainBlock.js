"use strict";

//// FUNCTION ////
/////////////////
function Loading() {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "text-muted text-center d-block my-5"
  }, /*#__PURE__*/React.createElement("p", null, "Loading..."), /*#__PURE__*/React.createElement("div", {
    className: "lds-ellipsis"
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null)));
  return element;
}

function FR2accepted(props) {
  var notifTime = new Date(props.notification.time);
  var element = /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 border border-dark my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-light py-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: props.domain + 'dashboard/' + props.notification.requestFrom
  }, "@", props.notification.requestFrom), " has accepted your friend request."))), /*#__PURE__*/React.createElement("div", {
    className: "w-100 d-flex justify-content-between align-items-center border-top border-dark p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-muted small"
  }, notifTime.toDateString(), ", ", notifTime.toLocaleTimeString()), /*#__PURE__*/React.createElement("div", {
    className: "d-block",
    onClick: function onClick() {
      props.handleNotificationRemove(props.notification.nid, props.domain);
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "close-notification",
    src: props.domain + 'img/svg/close.svg',
    alt: "close",
    title: "remove"
  }))));
  return element;
}

function FR1pending(props) {
  var notifTime = new Date(props.notification.time);
  var element = /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 border border-dark my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-md-8 d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-light py-3"
  }, "You have a friend request from ", /*#__PURE__*/React.createElement("a", {
    href: props.domain + 'dashboard/' + props.notification.requestFrom
  }, "@", props.notification.requestFrom), " ")), /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-md-4 d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-100"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: function onClick() {
      props.handleFriendRequestResponse('accept', props.notification.requestFrom, props.domain, props.notification.nid);
    }
  }, "Accept"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-block",
    onClick: function onClick() {
      props.handleFriendRequestResponse('reject', props.notification.requestFrom, props.domain, props.notification.nid);
    }
  }, "Reject")))), /*#__PURE__*/React.createElement("div", {
    className: "w-100 d-flex justify-content-between align-items-center border-top border-dark p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-muted small"
  }, notifTime.toDateString(), ", ", notifTime.toLocaleTimeString()), /*#__PURE__*/React.createElement("div", {
    className: "d-block",
    onClick: function onClick() {
      props.handleNotificationRemove(props.notification.nid, props.domain);
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "close-notification",
    src: props.domain + 'img/svg/close.svg',
    alt: "close",
    title: "remove"
  }))));
  return element;
}

function FR1accepted(props) {
  var notifTime = new Date(props.notification.time);
  var element = /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 border border-dark my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-light py-3"
  }, "You are now friends with ", /*#__PURE__*/React.createElement("a", {
    href: props.domain + 'dashboard/' + props.notification.requestFrom
  }, "@", props.notification.requestFrom), " "))), /*#__PURE__*/React.createElement("div", {
    className: "w-100 d-flex justify-content-between align-items-center border-top border-dark p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-muted small"
  }, notifTime.toDateString(), ", ", notifTime.toLocaleTimeString()), /*#__PURE__*/React.createElement("div", {
    className: "d-block",
    onClick: function onClick() {
      props.handleNotificationRemove(props.notification.nid, props.domain);
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "close-notification",
    src: props.domain + 'img/svg/close.svg',
    alt: "close",
    title: "remove"
  }))));
  return element;
}

function FR1rejected(props) {
  var notifTime = new Date(props.notification.time);
  var element = /*#__PURE__*/React.createElement("div", {
    className: "d-block w-100 border border-dark my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-light py-3"
  }, "Friend request from ", /*#__PURE__*/React.createElement("a", {
    href: props.domain + 'dashboard/' + props.notification.requestFrom
  }, "@", props.notification.requestFrom), " has been rejected."))), /*#__PURE__*/React.createElement("div", {
    className: "w-100 d-flex justify-content-between align-items-center border-top border-dark p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-muted small"
  }, notifTime.toDateString(), ", ", notifTime.toLocaleTimeString()), /*#__PURE__*/React.createElement("div", {
    className: "d-block",
    onClick: function onClick() {
      props.handleNotificationRemove(props.notification.nid, props.domain);
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "close-notification",
    src: props.domain + 'img/svg/close.svg',
    alt: "close",
    title: "remove"
  }))));
  return element;
}

function Notification(props) {
  var element = /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  });

  if (props.notification.type === 'fr1') {
    if (props.notification.request === 'pending') element = /*#__PURE__*/React.createElement(FR1pending, {
      domain: props.domain,
      notification: props.notification,
      handleNotificationRemove: props.handleNotificationRemove,
      handleFriendRequestResponse: props.handleFriendRequestResponse
    });else if (props.notification.request === 'accepted') element = /*#__PURE__*/React.createElement(FR1accepted, {
      domain: props.domain,
      notification: props.notification,
      handleNotificationRemove: props.handleNotificationRemove
    });else if (props.notification.request === 'rejected') element = /*#__PURE__*/React.createElement(FR1rejected, {
      domain: props.domain,
      notification: props.notification,
      handleNotificationRemove: props.handleNotificationRemove
    });
  } else if (props.notification.type === "fr2") {
    if (props.notification.request === "accepted") element = /*#__PURE__*/React.createElement(FR2accepted, {
      domain: props.domain,
      notification: props.notification,
      handleNotificationRemove: props.handleNotificationRemove
    });
  }

  return element;
}

function MainBlock(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    className: "display-5 my-3"
  }, "Notifications"), function () {
    var elementsArray = [];

    if (props.notifications.length > 0) {
      props.notifications.map(function (notification) {
        elementsArray.push( /*#__PURE__*/React.createElement(Notification, {
          key: notification.nid,
          domain: props.domain,
          notification: notification,
          handleNotificationRemove: props.handleNotificationRemove,
          handleFriendRequestResponse: props.handleFriendRequestResponse
        }));
      });
      return elementsArray;
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "text-muted w-100 text-center"
      }, "No notifications");
    }
  }());
  return element;
}