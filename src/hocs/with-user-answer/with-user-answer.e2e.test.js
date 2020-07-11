import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withUserAnswer from "./with-user-answer.jsx";
import {questions} from "../../test-mocks/test-questions.js";

configure({
  adapter: new Adapter()
});

const question = questions[1];
const MockComponent = () => (<div/>);
const MockComponentWrapped = withUserAnswer(MockComponent);

describe(`WithUserAnswer HOC`, () => {
  it(`should change props.userAnswers passed to wrapped component on onChange calling`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          question={question}
          onAnswer={() => {}}
        />
    );
    expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

    wrapper.props().onChange(1, true);
    expect(wrapper.props().userAnswers).toEqual([false, true, false, false]);

    wrapper.props().onChange(1, false);
    expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

    wrapper.props().onChange(0, true);
    expect(wrapper.props().userAnswers).toEqual([true, false, false, false]);
  });
});
