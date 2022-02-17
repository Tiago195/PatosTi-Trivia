import {
  INFO_USER_TYPE,
  SUM_SCORE_TYPE,
  INDEX_QUESTION_TYPE,
  ASSERTIONS_TYPE,
  RESET_QUESTION_TYPE,
} from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  indexQuestion: 0,
};

function playerRedux(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INFO_USER_TYPE:
    return {
      ...state,
      name: action.payload.player,
      gravatarEmail: action.payload.email,
    };
  case SUM_SCORE_TYPE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case INDEX_QUESTION_TYPE:
    return {
      ...state,
      indexQuestion: state.indexQuestion + 1,
    };
  case ASSERTIONS_TYPE:
    return {
      ...state,
      assertions: action.payload,
    };
  case RESET_QUESTION_TYPE:
    return INITIAL_STATE;
  default:
    return state;
  }
}

export default playerRedux;
