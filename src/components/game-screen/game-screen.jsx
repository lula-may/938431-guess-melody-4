import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {GameType} from "../../const";
import Mistakes from "../mistakes/mistakes.jsx";
import {AppRoute} from "../../const.js";
import {ActionCreator} from "../../reducer/game/game.js";
import {getMistakes} from "../../reducer/game/selectors.js";

const GameScreen = (props) => {
  const {children, goToWelcome, mistakes, type} = props;

  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <Link to={AppRoute.ROOT} className="game__back" onClick={goToWelcome}>
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <Mistakes
          count={mistakes}
        />
      </header>
      {children}
    </section>
  );
};

GameScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  goToWelcome: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  goToWelcome: () => {
    dispatch(ActionCreator.goToWelcome());
  }
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
