import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const onWelcomeButtonClick = () => {};

const App = (props) => {
  const {errorsAmount} = props;

  return <WelcomeScreen
    errorsAmount={errorsAmount}
    onWelcomeButtonClick={onWelcomeButtonClick}
  />;
};

App.propTypes = {
  errorsAmount: PropTypes.number.isRequired
};

export default App;
