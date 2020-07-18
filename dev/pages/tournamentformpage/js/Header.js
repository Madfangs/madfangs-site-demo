"use strict";

function NotificationTab(props) {
  var element;
  if (props.numOfNotifications > 0) element = /*#__PURE__*/React.createElement("li", {
    className: "nav-item pl-4 " + props.active
  }, /*#__PURE__*/React.createElement("a", {
    href: props.domain + props.nav.link,
    className: "nav-link"
  }, props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1), /*#__PURE__*/React.createElement("span", {
    className: "ml-1 badge badge-danger"
  }, props.numOfNotifications)));else element = /*#__PURE__*/React.createElement("li", {
    className: "nav-item pl-4 " + props.active
  }, /*#__PURE__*/React.createElement("a", {
    href: props.domain + props.nav.link,
    className: "nav-link"
  }, props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1)));
  return element;
}

function NavbarLinks(props) {
  var element = /*#__PURE__*/React.createElement("li", {
    className: "nav-item pl-4 " + props.active
  }, /*#__PURE__*/React.createElement("a", {
    href: props.domain + props.nav.link,
    className: "nav-link"
  }, props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1)));
  return element;
}

function DropdownNavbarLinks(props) {
  var element = /*#__PURE__*/React.createElement("a", {
    "class": "text-muted text-nowrap py-2 nav-link",
    href: props.domain + props.nav.link
  }, props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1));
  return element;
}

function HandleNavbarLinks(props) {
  var brfound = false;
  var brIndex = 0;
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, props.navigationFull.map(function (nav, index) {
    if (!brfound) {
      if (nav.name === 'br') {
        brfound = true;
        brIndex = index;
        return;
      } else if (nav.link === props.activeNav) {
        if (nav.link === 'notifications') return /*#__PURE__*/React.createElement(NotificationTab, {
          key: nav.link,
          nav: nav,
          active: "active",
          domain: props.domain,
          numOfNotifications: props.numOfNotifications
        });else return /*#__PURE__*/React.createElement(NavbarLinks, {
          key: nav.link,
          nav: nav,
          active: "active",
          domain: props.domain
        });
      } else if (nav.link === 'notifications') return /*#__PURE__*/React.createElement(NotificationTab, {
        key: nav.link,
        nav: nav,
        active: "",
        domain: props.domain,
        numOfNotifications: props.numOfNotifications
      });else return /*#__PURE__*/React.createElement(NavbarLinks, {
        key: nav.link,
        nav: nav,
        active: "",
        domain: props.domain
      });
    }
  }), brfound ? /*#__PURE__*/React.createElement("li", {
    "class": "nav-item dropdown pl-4 d-block d-md-none"
  }, /*#__PURE__*/React.createElement("a", {
    "class": "nav-link dropdown-toggle",
    href: "#",
    id: "navbarDropdown",
    role: "button",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false"
  }, "More"), /*#__PURE__*/React.createElement("div", {
    "class": "dropdown-menu header-bg-color",
    "aria-labelledby": "navbarDropdown"
  }, brIndex === 0 ? /*#__PURE__*/React.createElement("span", null) : props.navigationFull.map(function (nav, index) {
    if (index > brIndex) {
      return /*#__PURE__*/React.createElement(DropdownNavbarLinks, {
        key: nav.link,
        nav: nav,
        domain: props.domain
      });
    }
  }))) : /*#__PURE__*/React.createElement("span", null));
  return element;
}

function Header(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "navbar navbar-expand-md navbar-dark header p-2 p-md-4 fixed-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo--"
  }, /*#__PURE__*/React.createElement("a", {
    href: props.domain
  }, /*#__PURE__*/React.createElement("img", {
    src: props.domain + "img/svg/logo.svg",
    alt: "logo",
    className: "logo"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "navbar-toggler",
    type: "button",
    "data-toggle": "collapse",
    "data-target": "#navigation",
    "aria-controls": "navbarSupportedContent",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation"
  }, /*#__PURE__*/React.createElement("span", {
    className: "navbar-toggler-icon"
  }), props.numOfNotifications > 0 ? /*#__PURE__*/React.createElement("span", {
    className: "ml-1 badge badge-danger"
  }, props.numOfNotifications) : /*#__PURE__*/React.createElement("span", {
    className: "d-none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "collapse navbar-collapse",
    id: "navigation"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav"
  }, /*#__PURE__*/React.createElement(HandleNavbarLinks, {
    navigationFull: props.navigationFull,
    domain: props.domain,
    activeNav: props.activeNav,
    numOfNotifications: props.numOfNotifications
  })))), /*#__PURE__*/React.createElement("div", {
    className: "clear-header-lg d-none d-md-block"
  }), /*#__PURE__*/React.createElement("div", {
    className: "clear-header-md d-block d-md-none"
  }));
  return element;
}