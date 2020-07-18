"use strict";

function Loading(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "text-muted text-center d-block my-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Loading..."), /*#__PURE__*/React.createElement("div", {
    className: "lds-ellipsis"
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null))), ";");
  return element;
}

function PrePaymentView(props) {
  React.useEffect(function () {
    props.razorpayScript.current.src = "https://checkout.razorpay.com/v1/checkout.js";
    props.razorpayScript.current.async = true;
  }, []);
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "d-block text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "button-x d-inline-block"
  }, /*#__PURE__*/React.createElement("img", {
    className: "close",
    src: props.domain + "img/svg/close.svg",
    alt: "close"
  }))), /*#__PURE__*/React.createElement("form", {
    action: "http://localhost:3000/payment/success/",
    method: "POST"
  }, /*#__PURE__*/React.createElement("script", {
    ref: props.razorpayScript,
    src: "https://checkout.razorpay.com/v1/checkout.js",
    async: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    custom: "Hidden Element",
    name: "hidden"
  })));
  return element;
}

function Modal(props) {
  var element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cover-screen",
    ref: props.modal,
    style: {
      display: "none"
    }
  }, props.loadingAnimation ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Loading, null)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PrePaymentView, {
    domain: props.domain,
    paymentGatewayData: props.paymentGatewayData,
    razorpayScript: props.razorpayScript
  }))));
  return element;
}