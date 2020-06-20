import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {genreQuestionShape} from "../shapes";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false]
    };

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {question} = this.props;
    const {answers: userAnswers} = this.state;
    const {
      genre,
      answers
    } = question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
          </svg>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks"
            onSubmit={this._handleFormSubmit}
          >

            {answers.map((answer, i) => {
              return (
                <div key={answer.id} className="track">
                  <button className="track__button track__button--play" type="button"></button>
                  <div className="track__status">
                    <audio src={answer.src}></audio>
                  </div>
                  <div className="game__answer">
                    <input className="game__input visually-hidden" type="checkbox" name="answer" value={answer.id}
                      id={answer.id}
                      checked={userAnswers[i]}
                      onChange={(evt) => {
                        const value = evt.target.checked;

                        this.setState({
                          answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)]
                        });
                      }}
                    />
                    <label className="game__check" htmlFor={answer.id}>Отметить</label>
                  </div>
                </div>
              );
            })}

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }

  _handleFormSubmit(evt) {
    const {onAnswer, question} = this.props;
    const userAnswers = this.state.answers;
    evt.preventDefault();
    onAnswer(question, userAnswers);
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape(genreQuestionShape).isRequired
};

export default GenreQuestionScreen;
