import { combineReducers } from 'redux';
import { SET_NUM_OF_QUESTIONS, SET_QUESTIONS, SET_LETTER, EDIT_COMMENTS, SET_TEST, SET_CLASSROOM, SET_CLASSROOMS, SET_TESTS, SET_KEY, SET_FILE, SET_USER_ANSWERS, SET_SUBMISSIONS, SET_ASSIGNMENTS } from './actions.js';

const questions = (state = [], action: Action) => {
	if (action.type === SET_QUESTIONS) {

		let num = parseInt(action.payload);
    let qArray = Array.from(Array(num).keys());
    
    qArray = qArray.map((val, i) => {
      return {
        letter: 'A',
        comments: ''
      }
    });

		return qArray;
	}

  if (action.type === SET_LETTER) {
    let newState = state.slice();
    newState[action.index].letter = action.payload;
  	return newState;
  }

  if (action.type === EDIT_COMMENTS) {
  	let newState = state.slice();
  	newState[action.index].comments = action.payload;
  	return newState;
  }

	return state;
};

const numOfQuestions = (state = '', action: Action) => {
	if (action.type === SET_NUM_OF_QUESTIONS) {
		return action.payload;
	}

	return state;
}

const test = (state = '', action: Action) => {
	if (action.type === SET_TEST) {
		return action.payload;
	}

  return state;
}

const classroom = (state = '', action: Action) => {
	if (action.type === SET_CLASSROOM) {
		return action.payload;
	}

  return state;
}

const file = (state = '', action: Action) => {
  if (action.type === SET_FILE) {
    return action.payload;
  }

  return state;
}

const classrooms = (state = [], action: Action) => {
  if (action.type === SET_CLASSROOMS) {
    return action.payload;
  }

  return state;
}

const tests = (state = [], action: Action) => {
  if (action.type === SET_TESTS) {
    return action.payload;
  }

  return state;
}

const key = (state = [], action: Action) => {
  if (action.type === SET_KEY) {
    return action.payload;
  }

  return state;
}

const userAnswers = (state = [], action: Action) => {
  if (action.type === SET_USER_ANSWERS) {
    return action.payload;
  }

  return state;
}

const submissions = (state = [], action: Action) => {
  if (action.type === SET_SUBMISSIONS) {
    return action.payload;
  }

  return state;
}

const assignments = (state = [], action: Action) => {
  if (action.type === SET_ASSIGNMENTS) {
    return action.payload;
  }

  return state;
}



const rootReducer = combineReducers({ questions, numOfQuestions, test, classroom, file, classrooms, tests, key, userAnswers, submissions, assignments });

export default rootReducer;