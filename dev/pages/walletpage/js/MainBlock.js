"use strict";

function MainBlock(props) {
  function handleSetMoney(event) {
    var amount = parseFloat(event.currentTarget.value);
    props.setMoney(amount);
  }

  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "centered"
  }, /*#__PURE__*/React.createElement("div", {
    className: "display-5 text-center p-3"
  }, "Your Wallet"), /*#__PURE__*/React.createElement("div", {
    className: "lead text-center text-muted p-2"
  }, "Account Balance : ", props.accountBalance, " ", props.accountCurrency), /*#__PURE__*/React.createElement("div", {
    className: "w-100 d-block"
  }, /*#__PURE__*/React.createElement("form", {
    action: props.domain + "wallet/prepare-payment",
    method: "POST"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "amount",
    value: props.money,
    onChange: handleSetMoney,
    className: "form-control bg-dark d-block w-100 mb-2 mt-4 border border-dark text-light",
    placeholder: "Enter Amount"
  }), /*#__PURE__*/React.createElement("button", {
    "class": "btn btn-success btn-block mt-2",
    type: "submit",
    onClick: props.handleAddMoney
  }, "Add money"))))));
  return element;
}