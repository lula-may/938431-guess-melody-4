import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../const";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: -1
    };
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/dev-singer">
            <ArtistQuestionScreen
              onAnswer={() => {}}
              question={questions[0]}/>
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreen
              onAnswer={() => {}}
              question={questions[1]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderGameScreen() {
    const {errorsAmount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];
    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsAmount={errorsAmount}
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
            <ArtistQuestionScreen
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1
                }));
              }}
              question={question}
            />
          );

        case GameType.GENRE:
          return (
            <GenreQuestionScreen
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1
                }));
              }}
              question={questions[1]}
            />
          );
      }
    }
    return null;
  }
}

App.propTypes = {
  errorsAmount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default App;
