"use strict";

function Card(props) {
  var element = /*#__PURE__*/React.createElement("div", {
    className: "card col-4 col-md-3 col-lg-2 game-card px-0 bg-dark mr-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: 'img/jpg/' + props.id + '-card.jpg',
    alt: props.name + ' Card',
    className: "card-img-top"
  }));
  return element;
}

ReactDOM.render( /*#__PURE__*/React.createElement(React.Fragment, null, games.map(function (game) {
  return /*#__PURE__*/React.createElement(Card, {
    key: game.id,
    id: game.id,
    name: game.name
  });
})), document.getElementById('game-card-row'));