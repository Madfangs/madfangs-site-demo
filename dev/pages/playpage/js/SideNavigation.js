"use strict";

function Link(props) {
  if (props.nav.name === 'br') {
    // when br is found adds a line break
    return /*#__PURE__*/React.createElement("br", null);
  }

  if (props.nav.link === props.active) {
    // adds the active-sidenav class to the active tab
    return /*#__PURE__*/React.createElement("li", {
      className: "nav-item sidenav-item active-sidenav p-1"
    }, /*#__PURE__*/React.createElement("a", {
      href: props.domain + props.nav.link,
      className: "text-muted"
    }, props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1)));
  }

  return /*#__PURE__*/React.createElement("li", {
    className: "nav-item sidenav-item p-1"
  }, /*#__PURE__*/React.createElement("a", {
    href: props.domain + props.nav.link,
    className: "text-muted"
  }, props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1)));
}

function SideNavigation(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav text-muted"
  }, props.navs.map(function (nav) {
    return /*#__PURE__*/React.createElement(Link, {
      key: nav.link + "2",
      nav: nav,
      active: props.active,
      domain: props.domain
    });
  })));
  return element;
} // ReactDOM.render(<SideNavigation active={data.activeNav} navs={data.navigationFull} domain={data.domainName} />, document.getElementById('side-navigation'));