import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SingerQuestionScreen from "./singer-question-screen.jsx";
import {questions} from "../../test-mocks/test-questions";

configure({
  adapter: new Adapter()
});

const question = questions[0];
const MockEvent = {
  preventDefault() {}
};

it(`Should run callback with arguments corresponding to "userAnswer" on user's answering`, () => {
  const userAnswer = question.answers[1];
  const onAnswer = jest.fn((...args) => [...args]);
  const singerQuestionScreen = shallow(
      <SingerQuestionScreen
        onAnswer={onAnswer}
        question={question}
      />
  );

  const secondRadioElement = singerQuestionScreen.find(`input`).at(1);
  secondRadioElement.simulate(`change`, MockEvent);
  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
});
