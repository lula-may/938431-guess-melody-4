import React from "react";
import ReactDom from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app.jsx";
import questions from "./mocks/questions";
import {reducer} from "./reducer.js";

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const init = () => {
  const settings = {
    errorsCount: 3
  };

  ReactDom.render(
      <Provider store={store}>
        <App
          errorsCount={settings.errorsCount}
          questions={questions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
