import React from 'react';
import { Button, Row, ListGroup, ListGroupItem, Radio, FormGroup, FieldGroup } from 'react-bootstrap';

class AddTest extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		questions: []
  	};
  }

	//once Redux has been implemented, reroute to a new page to create the new test. For now, keep on teacher landing page.
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

  	this.setState({
  		questions: questions
  	});

  }

  handleSelectLetter(e, i) {
  	let questions = this.state.questions;
  	questions[i].letter = e.target.value;

  	this.setState({
  		questions: questions
  	});
  }

  render() {

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
	  		<Row>
		  		  <ListGroup>
				  		  {this.state.questions.map((question, i) => {
				  		  	return 
				  		  	  <ListGroupItem key={i}>
				  		  	    Choose one:
						  		    <FormGroup>
									      <Radio value="A" inline defaultChecked onChange={this.handleSelectLetter}>
									        A
									      </Radio>
									      {' '}
									      <Radio value="B" inline onChange={this.handleSelectLetter}>
									        B
									      </Radio>
									      {' '}
									      <Radio value="C" inline onChange={this.handleSelectLetter}>
									        C
									      </Radio>
									      {' '}
									      <Radio value="D" inline onChange={this.handleSelectLetter}>
									        D
									      </Radio>
									    </FormGroup>
				  		  	  </ListGroupItem>
				  		  })} 		  		
		  		  </ListGroup>
	  		</Row>
  		</div>
  	)
  }
}

export default AddTest;