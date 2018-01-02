import React from 'react';
import { Button, Row, ListGroup, ListGroupItem, Radio, FormGroup, FieldGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setNumOfQuestions, setQuestions, setTest, setClassroom } from '../redux/actionCreators.js';
import PropTypes from 'prop-types';

class CreateTest extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      redirect: false
  	};

    this.handleChangeNumOfQuestions = this.handleChangeNumOfQuestions.bind(this);
    this.handleChangeTest = this.handleChangeTest.bind(this);
    this.handleChangeClassroom = this.handleChangeClassroom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  	event.preventDefault();

    if (this.props.numOfQuestions <= 0 || this.props.numOfQuestions > 45) {
      alert('Number of questions must be greater than 0 and less than 46');
      return;
    }

    if (this.props.test.length < 8) {
      alert('Please enter a longer test name');
      return;
    }

    if (this.props.classroom.length < 8) {
      alert('please enter a longer classroom name');
      return;
    }

    this.props.setQuestions(this.props.numOfQuestions);

  	this.setState({
  		redirect: true
  	});

  }

  handleChangeNumOfQuestions(event) {
    this.props.setNumOfQuestions(event.target.value);
  }

  handleChangeTest(event) {
    this.props.setTest(event.target.value);
  }

  handleChangeClassroom(event) {
    this.props.setClassroom(event.target.value);
  }

  render() {

    if (this.state.redirect) {
      return (
        <Redirect to="/createQuestions"/>
      )
    }

  	return (
  		<div>
        <form onSubmit={this.handleSubmit} >
          <Row>
          <FormGroup>
            <ControlLabel>Test Name: </ControlLabel>
            <FormControl
              type="text"
              value={this.props.test}
              onChange={this.handleChangeTest}
            />
          </FormGroup>
          </Row>
          <Row>
          <FormGroup>
            <ControlLabel>Classroom Name: </ControlLabel>
            <FormControl
              type="text"
              value={this.props.classroom}
              onChange={this.handleChangeClassroom}
            />
          </FormGroup>
          </Row>
          <Row>
          <FormGroup>
            <ControlLabel>Number of Questions: </ControlLabel>
            <FormControl
              type="text"
              value={this.props.numOfQuestions}
              onChange={this.handleChangeNumOfQuestions}
            />
          </FormGroup>
          </Row>
  	  		<Row>
  	  		  <Button
  	          className="submitButton"
  	          type="submit"
  	        >
  	        Generate Questions
  	        </Button>
  	  		</Row>	 
        </form> 		
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
    numOfQuestions: state.numOfQuestions,
    test: state.test,
    classroom: state.classroom 
  };
};

const mapDispatchToProps = { setNumOfQuestions, setQuestions, setTest, setClassroom };

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);