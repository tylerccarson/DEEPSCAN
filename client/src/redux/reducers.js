import { combineReducers } from 'redux';
import { SET_QUESTIONS, SET_LETTER, EDIT_COMMENTS } from './actions.js';

const questions = (state = [], action: Action) => {
	if (action.type === SET_QUESTIONS) {
		return action.payload;
	}

  if (action.type === SET_LETTER) {
    let newState = state.slice();
    newState[action.index].letter = action.payload;
  	return newState;
  }

  //EDIT_COMMENTS
  if (action.type === 'EDIT_COMMENTS') {
  	let newState = state.slice();
  	newState[action.index].comments = action.payload;
  	return newState;
  }

	return state;
};

//add reducers for exam, teacher, etc... for initial form.

const rootReducer = combineReducers({ questions });

export default rootReducer;