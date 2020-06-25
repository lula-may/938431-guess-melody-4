import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.jsx";

import {GameType} from "../../const";

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: -1
    };
    this._handleAnswer = this._handleAnswer.bind(this);
  }

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
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];
    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={() => {
            this.setState({step: 0});
          }}
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
                onAnswer={this._handleAnswer}
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
                onAnswer={this._handleAnswer}
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

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
