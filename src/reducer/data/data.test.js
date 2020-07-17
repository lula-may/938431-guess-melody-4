import {reducer, ActionCreator, ActionType, Operation} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api.js";
import {questions} from "../../test-mocks/test-questions.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      questions: [],
    });
  });

  it(`should update questions when load question action supplied`, () => {
    expect(reducer({
      questions: [],
    }, {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    })).toEqual({
      questions,
    });
  });

});

describe(`ActionCreator`, () => {
  it(`should return correct action for questions loading`, () => {
    expect(ActionCreator.loadQuestions(questions)).toEqual({
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    });
  });
});

describe(`Operation`, () => {
  it(`should make a correct API call to "/questions"`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionsLoader = Operation.loadQuestions();

    MockApi.onGet(`/questions`)
    .reply(200, [{fake: true}]);

    return questionsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
      });
  });
});
