import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {AppRoute} from "../../const.js";

const WinScreen = (props) => {
  const {correctAnswersCount, mistakesCount, onReplayButtonClick} = props;

  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctAnswersCount} вопросов и совершили {mistakesCount} ошибки</p>
      <Link to={AppRoute.ROOT} className="replay" type="button" onClick={onReplayButtonClick}>Сыграть ещё раз</Link>
    </section>
  );
};

WinScreen.propTypes = {
  mistakesCount: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
  correctAnswersCount: PropTypes.number.isRequired,
};

export default WinScreen;
