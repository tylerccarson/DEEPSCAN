import React from 'react';
import axios from 'axios';
import { Form, FormControl, Button, DropdownButton, Panel, MenuItem, Row, Col } from 'react-bootstrap';
import FormData from 'form-data';
import Results from './Results.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import { setClassrooms, setSubmissions } from '../redux/actionCreators.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Student extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      redirect: false
  	}

    this.getClassrooms = this.getClassrooms.bind(this);
    this.getSubmissions = this.getSubmissions.bind(this);
  }

  getClassrooms() {
    axios.get('/classrooms')
      .then((res) => {
        this.props.setClassrooms(res.data);
        this.setState({
          redirect: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getSubmissions() {
    axios.get('/student/submissions')
      .then((res) => {
        console.log(res);

        //call action to set submissions prop, an array, which will rerender accordingly
        this.props.setSubmissions(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getSubmissions();
  }

  render() {

  	const style = {
  		form: {}
  	}

    if (this.state.redirect) {
      return (
        <Redirect to="/selectClassroom"/>
      )
    }

    return (

      <div>

        <Row>
          <Button onClick={this.getClassrooms}>
            Submit an assignment
          </Button>
        </Row>

        <Row>
          <a href="./assets/multiplechoice45question.pdf" download>
            <Button>Download an answer sheet</Button>
          </a>
        </Row>

        <Row>
          Submissions:
          {this.props.submissions.map((submission, i) => {
            return <div key={i}>{submission.test}</div>
          })}
        </Row>

      </div>
		)
  }
}

Student.propTypes = {
  classrooms: PropTypes.array,
  setClassrooms: PropTypes.func,
  setSubmissions: PropTypes.func,
  submissions: PropTypes.array
}

const mapStateToProps = (state) => {
  return { 
    classrooms: state.classrooms,
    submissions: state.submissions
  };
};

const mapDispatchToProps = { setClassrooms, setSubmissions };

export default connect(mapStateToProps, mapDispatchToProps)(Student);