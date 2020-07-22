import React from "react";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AuthScreen from "./auth-screen.jsx";

configure({
  adapter: new Adapter(),
});

describe(`AuthScreen Component`, () => {
  it(`should run callback on Replay button click`, () => {
    const onReplayButtonClick = jest.fn();
    const wrapper = shallow(
        <AuthScreen
          onReplayButtonClick={onReplayButtonClick}
          onSubmit={() => {}}
        />
    );

    const replayButton = wrapper.find(`.replay`);
    replayButton.simulate(`click`);
    expect(onReplayButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on form submit`, () => {
    const onSubmit = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <AuthScreen
          onReplayButtonClick={() => {}}
          onSubmit={onSubmit}
        />
    );

    const form = wrapper.find(`form`);
    const {loginRef} = wrapper.instance();
    const {passwordRef} = wrapper.instance();

    loginRef.current.value = `test@mail.ru`;
    passwordRef.current.value = `password`;

    form.simulate(`submit`, {preventDefault: () => {}});
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      email: `test@mail.ru`,
      password: `password`,
    });
  });

});
