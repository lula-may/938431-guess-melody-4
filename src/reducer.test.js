import {reducer, ActionCreator, ActionType} from "./reducer.js";

describe(`Reducer`, () => {
  it(`should return initialState on empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      mistakes: 0,
      step: -1
    });
  });

  it(`should increment current step by passed value`, () => {
    expect(reducer({
      mistakes: 0,
      step: -1,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    }
    )).toEqual({
      mistakes: 0,
      step: 0,
    });

    expect(reducer({
      mistakes: 1,
      step: 1,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 1,
      step: 1,
    });
  });

  it(`should increment mistakes count by passed value`, () => {
    expect(reducer({
      mistakes: 0,
      step: -1,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakes: 1,
      step: -1,
    });

    expect(reducer({
      mistakes: 10,
      step: 10,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 10,
    })).toEqual({
      mistakes: 20,
      step: 10,
    });
  });

});

describe(`ActionCreator`, () => {
  it(`should return correct action for step increment`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`should return correct action for mistakes increment`, () => {
    expect(ActionCreator.incrementMistake()).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });
});
