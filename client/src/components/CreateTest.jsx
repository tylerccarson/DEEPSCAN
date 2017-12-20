import React from 'react';
import { Button, Row, ListGroup, ListGroupItem, Radio, FormGroup, FieldGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import QuestionEntry from './QuestionEntry.jsx';

class CreateTest extends React.Component {
  constructor(props) {
  	super(props);
  }

  props: {
  	questions: Array
  };

  //work to be done here regarding dispatching an action to change values in the questions via the store
  handleSelectLetter(e, i) {
  	// let questions = this.state.questions;
  	// questions[i].letter = e.target.value;

  	// this.setState({
  	// 	questions: questions
  	// });
  }

  render() {
  	return (
  		<ListGroup>
  		  <form>
	  		  {this.props.questions.map((question, i) => {
	  		  	return <QuestionEntry key={i} i={i} question={question}/>
		  		  })} 
  		  </form>			  		
  		</ListGroup>
  	)
  }
}

const mapStateToProps = (state) => {
	return { questions: state.questions	};
};

export default connect(mapStateToProps)(CreateTest);