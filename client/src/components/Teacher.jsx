import React from 'react';
import { Button, Row, ListGroup, ListGroupItem, Radio, FormGroup, FieldGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setQuestions } from '../redux/actionCreators.js';

class Teacher extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      redirect: false
  	};
  }

  props: {
    questions: Array,
    setQuestions: Function
  };

  handleSubmit(e) {
  	e.preventDefault();

    //should probably turn this whole process into a form, rather than prompts. Save for the Redux migration.
  	let exam = prompt('Name of exam?');
  	let subject = prompt('Which subject?');
    let number = prompt('Id for test?');
  	
  	let numOfQuestions = 0;
  	while (numOfQuestions <= 0 || numOfQuestions > 45) {
  		numOfQuestions = prompt('How many questions? Please choose more than 0 or greater than 45.');
  		numOfQuestions = parseInt(numOfQuestions);
  	}

  	//this could probably be more efficient
  	let questions = Array.from(Array(numOfQuestions).keys());;
    questions = questions.map((val, i) => {
    	return {
    		letter: 'A',
    		comments: ''
    	}
    });

    //trigger an action to change questions redux state
    this.props.setQuestions(questions);

    //send to next page to customize the created test
  	this.setState({
  		redirect: true
  	});

  }

  render() {

    if (this.state.redirect) {
      return (
        <Redirect to="/createTest"/>
      )
    }

  	return (
  		<div>
	  		<Row>
	  		  <Button
	          className="submitButton"
	          type="submit"
	          onClick={(e)=>this.handleSubmit(e)}
	        >
	        Generate New Test
	        </Button>
	  		</Row>
	  		
  		</div>
  	)
  }
}

const mapStateToProps = (state) => {
  return { questions: state.questions };
};

const mapDispatchToProps = { setQuestions };

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);