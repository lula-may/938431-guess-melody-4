import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class GenreQuestionItem extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const {
      answer,
      id,
      renderPlayer,
      userAnswer,
    } = this.props;

    return (
      <div className="track">
        {renderPlayer(answer.src, id)}
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={answer.id}
            id={answer.id}
            checked={userAnswer}
            onChange={this.handleChange}
          />
          <label className="game__check" htmlFor={answer.id}>Отметить</label>
        </div>
      </div>
    );
  }

  handleChange(evt) {
    const {id, onChange} = this.props;
    const value = evt.target.checked;
    onChange(id, value);
  }
}

GenreQuestionItem.propTypes = {
  answer: PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswer: PropTypes.bool.isRequired
};

export default GenreQuestionItem;
