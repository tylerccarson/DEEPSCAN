import { SET_NUM_OF_QUESTIONS, SET_QUESTIONS, SET_LETTER, EDIT_COMMENTS, SET_TEST, SET_CLASSROOM } from './actions';

export function setNumOfQuestions(numberOfQuestions: String) {
  return { type: SET_NUM_OF_QUESTIONS, payload: numberOfQuestions };
}

export function setQuestions(numberOfQuestions: String) {
	return { type: SET_QUESTIONS, payload: numberOfQuestions };
}

export function setLetter(letter: String, index: Number) {
	return { type: SET_LETTER, payload: letter, index: index };
}

export function editComments(comment: String, index: Number) {
	return { type: EDIT_COMMENTS, payload: comment, index: index} ;
}

export function setTest(test: String) {
	return { type: SET_TEST, payload: test };
}

export function setClassroom(classroom: String) {
	return { type: SET_CLASSROOM, payload: classroom };
}