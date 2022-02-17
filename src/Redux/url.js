import { FORMATED_URL_TYPE } from '../action';
const INITAL_STATE = 'https://opentdb.com/api.php?amount=5'

const urlReduce = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case FORMATED_URL_TYPE:
      return action.payload;
    default:
      return state;
  }
}
export default urlReduce;