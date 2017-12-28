import React from 'react';
import { Button, Row, ListGroup, ListGroupItem, Radio, FormGroup, FieldGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import QuestionEntry from './QuestionEntry.jsx';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

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

  	//submit to database via axios call POST request

    //upon successful addition to the DB...
  	this.setState({
  		redirect: true
  	})
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
  classroom: PropTypes.string
}

const mapStateToProps = (state) => {
	return { 
		questions: state.questions,
		test: state.test,
		classroom: state.classroom
	};
};

export default connect(mapStateToProps)(CreateTest);