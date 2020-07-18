import React from "react";
import PropTypes from "prop-types";

const ErrorScreen = (props) => {
  const {errorMessage} = props;
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title" style={{color: `red`}}>Ошибка загрузки данных.</h2>
      <p className="result__total result__total--fail">
    Упсс... У нас что-то сломалось. {errorMessage}
      </p>
    </section>
  );
};

ErrorScreen.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorScreen;
