import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.jsx";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.jsx";

import {ActionCreator} from "../../reducer.js";
import {GameType} from "../../const";

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));

class App extends PureComponent {

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreenWrapped
              onAnswer={() => {}}
              question={questions[0]}/>
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreenWrapped
              onAnswer={() => {}}
              question={questions[1]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderGameScreen() {
    const {
      maxMistakes,
      mistakes,
      onAnswer,
      onWelcomeButtonClick,
      questions,
      resetGame,
      step,
    } = this.props;

    const question = questions[step];
    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          mistakesCount={mistakes}
          onReplayButtonClick={resetGame}
          questionsCount={questions.length}
        />
      );
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
                question={questions[1]}
              />
            </GameScreen>
          );
      }
    }
    return null;
  }

  _handleAnswer() {
    this.setState((prevState) => ({
      step: prevState.step + 1
    }));
  }
}
const mapStateToProps = (state) => ({
  maxMistakes: state.maxMistakes,
  mistakes: state.mistakes,
  questions: state.questions,
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
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
