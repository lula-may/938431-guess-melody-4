import React, {PureComponent} from "react";
import {Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import AuthScreen from "../auth-screen/auth-screen.jsx";
import ErrorScreen from "../error-screen/error-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.jsx";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.jsx";

import {ActionCreator} from "../../reducer/game/game.js";
import {AppRoute, GameType} from "../../const";
import {getMaxMistakes, getMistakes, getStep} from "../../reducer/game/selectors.js";
import {getQuestions, getLoadingState, getErrorState} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import history from "../../history.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));

class App extends PureComponent {

  render() {
    const {login, mistakes, questions, resetGame} = this.props;
    const correctAnswersCount = questions.length - mistakes;

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>

          <Route exact path={AppRoute.LOGIN}>
            <AuthScreen
              onReplayButtonClick={resetGame}
              onSubmit={login}
            />
          </Route>

          <Route exact path={AppRoute.ERROR}>
            <ErrorScreen/>
          </Route>

          <Route exact path={AppRoute.LOSE}>
            <GameOverScreen
              onReplayButtonClick={resetGame}
            />
          </Route>

          <Route exact path={AppRoute.RESULT}>
            <WinScreen
              correctAnswersCount={correctAnswersCount}
              mistakesCount={mistakes}
              onReplayButtonClick={resetGame}
            />
          </Route>
        </Switch>
      </Router>
    );
  }

  _renderGameScreen() {
    const {
      authorizationStatus,
      hasErrors,
      isLoading,
      maxMistakes,
      mistakes,
      onAnswer,
      onWelcomeButtonClick,
      questions,
      step,
    } = this.props;

    const question = questions[step];

    if (isLoading) {
      return (
        <div>Loading...</div>
      );
    }

    if (hasErrors) {
      return history.push(AppRoute.ERROR);
    }

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }
      return history.push(AppRoute.RESULT);
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreenWrapped
                onAnswer={onAnswer}
                question={question}
              />
            </GameScreen>
          );

        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreenWrapped
                onAnswer={onAnswer}
                question={question}
              />
            </GameScreen>
          );
      }
    }
    return null;
  }
}
const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  hasErrors: getErrorState(state),
  isLoading: getLoadingState(state),
  maxMistakes: getMaxMistakes(state),
  mistakes: getMistakes(state),
  questions: getQuestions(state),
  step: getStep(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onAnswer(question, userAnswer) {
    dispatch(ActionCreator.incrementMistake(question, userAnswer));
    dispatch(ActionCreator.incrementStep());
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  }
});

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  hasErrors: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
