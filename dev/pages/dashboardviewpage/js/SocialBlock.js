"use strict";

function SearchResults(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, props.data.map(function (person) {
    return /*#__PURE__*/React.createElement("a", {
      href: props.domain + "dashboard/" + person.username,
      className: "d-block col-12 friend-card border border-dark p-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row d-flex flex-wrap align-items-center text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "friend-card-img mx-auto"
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
    }, "@", person.username))), person.available ? /*#__PURE__*/React.createElement("div", {
      className: "w-100 d-block mt-3"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-block",
      onClick: function onClick() {
        props.addFriend(person.username, props.domain);
      }
    }, "Add Friend")) : /*#__PURE__*/React.createElement("span", {
      className: "d-none"
    })));
  }));
  return element;
}

function SocialBlock(props) {
  function handleKeyDown(event) {
    var keyValue = event.which || event.keyCode;
    if (keyValue === 13) props.fetchSearchData(props.domain, props.username);
    return;
  }

  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "lead"
  }, "Search users"), /*#__PURE__*/React.createElement("div", {
    "class": "input-group w-100 mb-4 bg-dark search-bar"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    "class": "col bg-dark border-0 search-input text-light",
    ref: props.searchInputRef,
    placeholder: "username",
    onKeyDown: handleKeyDown
  }), /*#__PURE__*/React.createElement("div", {
    className: "search",
    onClick: function onClick() {
      props.fetchSearchData(props.domain, props.username);
    }
  }, /*#__PURE__*/React.createElement("div", {
    "class": "input-group-text bg-dark border-0"
  }, /*#__PURE__*/React.createElement("img", {
    className: "search-btn",
    src: props.domain + 'img/svg/search.svg',
    alt: "Search"
  })))), /*#__PURE__*/React.createElement(SearchResults, {
    data: props.searchData,
    domain: props.domain,
    addFriend: props.addFriend,
    available: props.available
  })));
  return element;
}