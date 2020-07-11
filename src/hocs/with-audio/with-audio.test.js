import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";

import withAudio from "./with-audio.jsx";

const MockComponent = (props) => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.node.isRequired
};

const MockComponentWrapped = withAudio(MockComponent);

describe(`WithAudio Component`, () => {
  it(`should render correctly WithAudio component`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          isPlaying={true}
          onPlayButtonClick={() => {}}
          src={`path`}
        />, {createNodeMock: () => {
          return {};
        }}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
