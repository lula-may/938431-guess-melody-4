import {ActionType, ActionCreator, AuthorizationStatus, reducer} from "./user.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      authorizationStatus: `NO_AUTH`,
    });
  });

  it(`should set a given value to authorizationStatus`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: `AUTH`,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: `NO_AUTH`,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: `NO_AUTH`,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: `AUTH`,
    });
  });
});

describe(`ActionCreator`, () => {
  it(`should return correct action for authorization require`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });
  });
});
