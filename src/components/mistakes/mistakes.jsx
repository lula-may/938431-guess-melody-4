import React from "react";
import PropTypes from "prop-types";

const Mistakes = (props) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``).map((item, i) => `${item}${i}`);
  return (
    <div className="game__mistakes">
      {mistakes.map((key) => (
        <div key={key} className="wrong"></div>
      ))}
    </div>
  );
};

Mistakes.propTypes = {
  count: PropTypes.number.isRequired
};

export default Mistakes;
