export const SET_TOKEN_TYPE = 'SET_TOKEN';
export const INFO_USER_TYPE = 'INFO_USER';
export const SUM_SCORE_TYPE = 'SUM_SCORE';
export const INDEX_QUESTION_TYPE = 'INDEX_QUESTION';
export const RESET_QUESTION_TYPE = 'RESET_QUESTION';
export const ASSERTIONS_TYPE = 'ASSERTIONS';
export const FORMATED_URL_TYPE = 'FORMATED_URL';

export const setToken = (token) => ({
  type: SET_TOKEN_TYPE,
  payload: token,
});

export const setInfoUser = (infosUsuario) => ({
  type: INFO_USER_TYPE,
  payload: infosUsuario,
});

export const setScore = (payload) => ({
  type: SUM_SCORE_TYPE,
  payload,
});

export const nextQuestion = () => ({
  type: INDEX_QUESTION_TYPE,
});

export const resetGame = () => ({
  type: RESET_QUESTION_TYPE,
});

export const setAssertions = (payload) => ({
  type: ASSERTIONS_TYPE,
  payload,
});

export const setUrl = (newUrl) => ({
  type: FORMATED_URL_TYPE,
  payload: newUrl,
})