import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionItem from "./genre-question-item.jsx";

configure({
  adapter: new Adapter(),
});

const answer = {
  src: `https://samples/1.ogg`,
  genre: `blues`,
  id: `answer-3`
};

describe(`GenreQuestionItem`, () => {
  it(`should run callback on input change`, () => {
    const onChange = jest.fn();
    const wrapper = shallow(
        <GenreQuestionItem
          answer={answer}
          id={0}
          onChange={onChange}
          renderPlayer={() => {}}
          userAnswer={false}
        />
    );

    const input = wrapper.find(`.game__input`);
    input.simulate(`change`, {target: {checked: true}});

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
