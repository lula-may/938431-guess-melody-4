import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {genreQuestionShape} from "../shapes";

const withUserAnswer = (Component) => {

  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: [false, false, false, false]
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleUserAnswer = this.handleUserAnswer.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          onAnswer={this.handleUserAnswer}
          onChange={this.handleChange}
        />
      );
    }

    handleChange(i, value) {
      const {answers} = this.state;
      const userAnswers = answers.slice();
      userAnswers[i] = value;

      this.setState({
        answers: userAnswers,
      });
    }

    handleUserAnswer() {
      const {onAnswer, question} = this.props;
      const userAnswers = this.state.answers;
      onAnswer(question, userAnswers);
    }
  }

  WithUserAnswer.propTypes = {
    question: PropTypes.shape(genreQuestionShape).isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
