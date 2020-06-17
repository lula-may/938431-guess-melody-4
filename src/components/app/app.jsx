import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import SingerQuestionScreen from "../singer-question-screen/singer-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";

const onWelcomeButtonClick = () => {};

const App = (props) => {
  const {errorsAmount, questions} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen
            errorsAmount={errorsAmount}
            onWelcomeButtonClick={onWelcomeButtonClick}
          />
        </Route>
        <Route exact path="/dev-singer">
          <SingerQuestionScreen
            question={questions[0]}/>
        </Route>
        <Route exact path="/dev-genre">
          <GenreQuestionScreen
            question={questions[1]}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsAmount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default App;
