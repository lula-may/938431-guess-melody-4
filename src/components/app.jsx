import React from "react";
import {WelcomeScreen} from "./welcome-screen.jsx";

export const App = (props) => {
// eslint-disable-next-line react/prop-types
  const {errorsAmount} = props;

  return <WelcomeScreen
    errorsAmount={errorsAmount}
  />;
};
