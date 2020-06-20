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
          question={question}
        />
    );

    const formElement = genreQuestionScreen.find(`form`);
    const formSubmitPrevention = jest.fn();

    formElement.simulate(`submit`, {preventDefault: formSubmitPrevention});

    expect(formSubmitPrevention).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledTimes(1);
  });

  it(`should be supplied corresponding to "userAnswer" arguments to the callback on user's answering`, () => {
    const onAnswer = jest.fn((...args) => [...args]);
    const question = questions[1];
    const checkedInputId = question.answers[1].id;
    const userAnswer = [false, true, false, false];

    const genreQuestionScreen = shallow(
        <GenreQuestionScreen
          onAnswer={onAnswer}
          question={question}
        />
    );

    const formElement = genreQuestionScreen.find(`form`);
    const checkedInput = genreQuestionScreen.find(`#${checkedInputId}`);

    checkedInput.simulate(`change`, {target: {checked: true}});
    formElement.simulate(`submit`, {preventDefault: () => {}});

    // The first argument of the first call to "onAnswer" should match "question"
    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    // The second argument of the first call to "onAnswer" should match "userAnswer"
    expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
    // Array of "checked" attribute values of checkboxes is equal to "userAnswer"
    expect(genreQuestionScreen.find(`input`)
      .map((item) => item.prop(`checked`)))
      .toEqual(userAnswer);
  });
});

