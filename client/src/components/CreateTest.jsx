import React from 'react';
import axios from 'axios';
import { Button, Row, ListGroup, ListGroupItem, Radio, FormGroup, FieldGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import QuestionEntry from './QuestionEntry.jsx';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { setNumOfQuestions, setQuestions, setTest, setClassroom } from '../redux/actionCreators.js';

class CreateTest extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		redirect: false
  	}

  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  	event.preventDefault();

    axios.post('/create/test', {
    	test: this.props.test,
    	classroom: this.props.classroom,
    	answers: this.props.questions
    })
      .then((res) => {

      	this.props.setNumOfQuestions(0);
      	this.props.setQuestions(this.props.numOfQuestions);
      	this.props.setTest('');
      	this.props.setClassroom('');

      	alert('Test has been submitted!');

		  	this.setState({
		  		redirect: true
		  	});
		  	
      })
      .catch((err) => {
      	console.log(err);
      });
  }

  render() {

    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      )
    }

  	return (
  		<div>
	  		<h3>{`Creating ${this.props.test} for ${this.props.classroom}`}</h3>
	  		<Row>
	  		  <Link to="/teacher">
		  		  <Button>
		  		    Go Back
		  		  </Button>
	  		  </Link>
	  		  <Button onClick={this.handleSubmit} >
	  		    Submit Test
	  		  </Button>
	  		</Row>
	  		<Row>
		  		<ListGroup>
		  		  <form>
			  		  {this.props.questions.map((question, i) => {
			  		  	return <QuestionEntry key={i} i={i} question={question} />
				  		  })} 
		  		  </form>			  		
		  		</ListGroup>
	  		</Row>
  		</div>
  	)
  }
}

CreateTest.propTypes = {
  questions: PropTypes.array,
  numOfQuestions: PropTypes.string,
  test: PropTypes.string,
  classroom: PropTypes.string,
  setNumOfQuestions: PropTypes.func,
  setQuestions: PropTypes.func,
  setTest: PropTypes.func,
  setClassroom: PropTypes.func
}

const mapStateToProps = (state) => {
	return { 
		questions: state.questions,
		test: state.test,
		classroom: state.classroom,
		numOfQuestions: state.numOfQuestions
	};
};

const mapDispatchToProps = { setNumOfQuestions, setQuestions, setTest, setClassroom };

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);