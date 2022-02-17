import { SET_TOKEN_TYPE } from '../action';

function tokenRedux(state = 'invalid', action) {
  switch (action.type) {
  case SET_TOKEN_TYPE:
    return action.payload;
  default:
    return state;
  }
}

export default tokenRedux;
