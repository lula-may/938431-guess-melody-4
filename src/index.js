import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";
import questions from "./mocks/questions";

const init = () => {
  const settings = {
    errorsCount: 3
  };

  ReactDom.render(
      <App
        errorsCount={settings.errorsCount}
        questions={questions}
      />,
      document.querySelector(`#root`)
  );
};

init();
