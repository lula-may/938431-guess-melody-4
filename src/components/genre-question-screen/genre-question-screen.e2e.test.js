import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";
import {questions} from "../../test-mocks/test-questions";

Enzyme.configure({
  adapter: new Adapter()
});


describe(`GenreQuestionComponent`, () => {
  it(`On user's answering the form shouldn't be sent but should run callback`, () => {
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

  it(`On user's answering parameters corresponding to "userAnswer" should be passed to the callback`, () => {
    const onAnswer = jest.fn((...args) => [...args]);
    const question = questions[1];
    const userAnswer = [false, true, false, false];

    const genreQuestionScreen = shallow(
        <GenreQuestionScreen
          onAnswer={onAnswer}
          question={question}
        />
    );

    const formElement = genreQuestionScreen.find(`form`);
    const secondInput = genreQuestionScreen.find(`input`).at(1);

    secondInput.simulate(`change`, {target: {checked: true}});
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

