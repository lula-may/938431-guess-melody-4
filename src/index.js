import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

const init = () => {
  const settings = {
    errorsAmount: 3
  };

  ReactDom.render(
      <App
        errorsAmount={settings.errorsAmount}
      />,
      document.querySelector(`#root`)
  );
};

init();
