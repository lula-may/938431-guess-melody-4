import {reducer, ActionCreator, ActionType, Operation} from "./reducer.js";
import MockAdapter from "axios-mock-adapter";
import {createApi} from "./api.js";
import {questions} from "./test-mocks/test-questions.js";

const AVATAR_URL = `https://api.adorable.io/avatars`;

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      maxMistakes: 3,
      mistakes: 0,
      questions: [],
      step: -1
    });
  });

  it(`should increment current step by passed value`, () => {
    expect(reducer({
      mistakes: 0,
      step: -1,
      questions,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    }
    )).toEqual({
      mistakes: 0,
      step: 0,
      questions,
    });

    expect(reducer({
      mistakes: 1,
      step: 1,
      questions,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 1,
      step: 1,
      questions,
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
      mistakes: 1,
      step: 1,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakes: 2,
      step: 1,
    });
  });

  it(`should return default state with step=0 when RESET action supplied`, () => {
    expect(reducer({
      maxMistakes: 3,
      mistakes: 1,
      questions,
      step: questions.length,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      maxMistakes: 3,
      mistakes: 0,
      questions,
      step: 0,
    });
  });

  it(`should return default state when load question action supplied`, () => {
    expect(reducer({
      maxMistakes: 3,
      mistakes: 0,
      questions: [],
      step: -1,
    }, {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    })).toEqual({
      maxMistakes: 3,
      mistakes: 0,
      questions,
      step: -1,
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

  it(`should return action with payload 0 for mistakes increment on user's correct answering artist question`, () => {
    const question = questions[0];

    const correctAnswer = {
      artist: `Lady Gaga`,
      avatar: `${AVATAR_URL}/2`,
      id: `artist1`
    };

    expect(ActionCreator.incrementMistake(question, correctAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`should return action with payload 1 for mistakes increment on user's wrong answering artist question`, () => {
    const question = questions[0];

    const wrongAnswer = {
      artist: `Chris Rea`,
      avatar: `${AVATAR_URL}/1`,
      id: `artist0`
    };

    expect(ActionCreator.incrementMistake(question, wrongAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`should return action with payload 0 for mistakes increment on user's correct answering genre question`, () => {
    const question = questions[1];

    const correctAnswer = [false, true, false, true];

    expect(ActionCreator.incrementMistake(question, correctAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`should return correct action for gameReset`, () => {
    expect(ActionCreator.resetGame()).toEqual({
      type: ActionType.RESET,
      payload: null,
    });
  });

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
