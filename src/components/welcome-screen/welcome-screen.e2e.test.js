import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`WelcomeScreenComponent`, () => {
  it(`Should run callback when clicking WelcomeScreenButton`, () => {
    const onWelcomeButtonClick = jest.fn();
    const welcomeScreen = shallow(
        <WelcomeScreen
          errorsAmount={3}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
    );
    const welcomeButton = welcomeScreen.find(`button.welcome__button`);

    welcomeButton.simulate(`click`);
    expect(onWelcomeButtonClick).toHaveBeenCalledTimes(1);
  });
});
