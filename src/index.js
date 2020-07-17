import React from "react";
import ReactDom from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import {createApi} from "./api.js";
import App from "./components/app/app.jsx";
import {reducer, Operation} from "./reducer.js";

const api = createApi(() => {});

const store = createStore(reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operation.loadQuestions());

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
