import { combineReducers } from 'redux';
import token from './users';
import player from './trivia';
import url from './url';

const rootReducers = combineReducers({ token, player, url });

export default rootReducers;
