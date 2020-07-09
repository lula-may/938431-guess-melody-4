import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";
import {questions} from "../../test-mocks/test-questions";

Enzyme.configure({
  adapter: new Adapter()
});


describe(`GenreQuestionComponent`, () => {
  it(`shouldn't send form but should run callback on user's answering`, () => {
    const onAnswer = jest.fn();
    const question = questions[1];
    const genreQuestionScreen = shallow(
        <GenreQuestionScreen
          onAnswer={onAnswer}
          onChange={() => {}}
          question={question}
          renderPlayer={() => {}}
          userAnswers={[false, true, false, true]}
        />
    );

    const formElement = genreQuestionScreen.find(`form`);
    const formSubmitPrevention = jest.fn();

    formElement.simulate(`submit`, {preventDefault: formSubmitPrevention});

    expect(formSubmitPrevention).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledTimes(1);
  });

  it(`should pass corresponding to "userAnswer" arguments to the callback on user's answering`, () => {
    const onAnswer = jest.fn((...args) => [...args]);
    const question = questions[1];
    const userAnswers = [false, true, false, false];

    const genreQuestionScreen = shallow(
        <GenreQuestionScreen
          onAnswer={onAnswer}
          onChange={() => {}}
          question={question}
          renderPlayer={() => {}}
          userAnswers={userAnswers}
        />
    );

    const formElement = genreQuestionScreen.find(`form`);

    formElement.simulate(`submit`, {preventDefault: () => {}});

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer.mock.calls[0][0]).toEqual(undefined);
  });

  it(`should pass consistent arguments (1, true) to callback on user checking checkbox`, () => {
    const onChange = jest.fn((...args) => [...args]);
    const question = questions[1];
    const userAnswers = [false, false, false, false];

    const genreQuestionScreen = shallow(
        <GenreQuestionScreen
          onAnswer={() => {}}
          onChange={onChange}
          question={question}
          renderPlayer={() => {}}
          userAnswers={userAnswers}
        />
    );

    const secondCheckboxElement = genreQuestionScreen.find(`.game__input`).at(1);
    secondCheckboxElement.simulate(`change`, {target: {checked: true}});

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(1);
    expect(onChange.mock.calls[0][1]).toEqual(true);
  });
});

