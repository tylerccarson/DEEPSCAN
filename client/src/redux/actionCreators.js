import { SET_QUESTIONS, SET_LETTER, EDIT_COMMENTS } from './actions';

export function setQuestions(questions: Array) {
  return { type: SET_QUESTIONS, payload: questions };
}

export function setLetter(letter: String, index: Number) {
	return { type: SET_LETTER, payload: letter, index: index };
}

export function editComments(comment: String, index: Number) {
	return { type: EDIT_COMMENTS, payload: comment, index: index};
}