import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";
import {genreQuestionShape} from "../shapes";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {
      question: {genre, answers},
      onChange,
      renderPlayer,
      userAnswers,
    } = this.props;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks"
          onSubmit={this._handleFormSubmit}
        >

          {answers.map((answer, i) => {
            return (
              <GenreQuestionItem
                key={answer.id}
                answer={answer}
                id={i}
                onChange={onChange}
                renderPlayer={renderPlayer}
                userAnswer={userAnswers[i]}
              />
            );
          })}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }

  _handleFormSubmit(evt) {
    const {onAnswer} = this.props;
    evt.preventDefault();
    onAnswer();
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  question: PropTypes.shape(genreQuestionShape).isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired
};

export default GenreQuestionScreen;
