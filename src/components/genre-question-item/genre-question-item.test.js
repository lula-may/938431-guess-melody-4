import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionItem from "./genre-question-item.jsx";

const answer = {
  src: `https://samples/1.ogg`,
  genre: `blues`,
  id: `answer-3`
};

describe(`GenreQuestionItem`, () => {
  it(`should render correctly GenreQuestionItem component`, () => {
    const tree = renderer.create(
        <GenreQuestionItem
          answer={answer}
          id={0}
          onChange={() => {}}
          renderPlayer={() => {}}
          userAnswer={true}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

