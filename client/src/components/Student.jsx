import React from 'react';
import axios from 'axios';
import { Form, FormControl, Button, DropdownButton, Panel, MenuItem, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import FormData from 'form-data';
import Results from './Results.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import { setClassrooms, setSubmissions, setKey, setUserAnswers } from '../redux/actionCreators.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Student extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      redirect: false,
      to: ''
  	}

    this.getClassrooms = this.getClassrooms.bind(this);
    this.getSubmissions = this.getSubmissions.bind(this);
    this.goToTest = this.goToTest.bind(this);
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
        this.props.setSubmissions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goToTest(index) {

    let classroom = this.props.submissions[index].classroom;
    let test = this.props.submissions[index].test;

    axios.get('/key', {
      params: {
        classroom: classroom,
        test: test
      }
    })
      .then((res) => {
        this.props.setKey(res.data);

        let answers = this.props.submissions[index].answers.sort((a, b) => {
          return a[0] - b[0];
        });

        this.props.setUserAnswers(answers);

        this.setState({
          redirect: true,
          to: 'goToTest'
        });

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

    if (this.state.redirect && this.state.to === '') {
      return (
        <Redirect to="/selectClassroom"/>
      )

    } else if (this.state.redirect && this.state.to === 'goToTest') {
      return (
        <Redirect to="/results"/>
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
          User Submissions:
          <ListGroup>
          {this.props.submissions.map((submission, i) => {

            let date = new Date(submission.updated).toLocaleString('en-US', { hour12: true });

            return <ListGroupItem key={i} header={submission.classroom} onClick={() => this.goToTest(i)}>{submission.test} submitted {date}</ListGroupItem>
          })}
          </ListGroup>
        </Row>

      </div>
		)
  }
}

Student.propTypes = {
  classrooms: PropTypes.array,
  setClassrooms: PropTypes.func,
  setSubmissions: PropTypes.func,
  submissions: PropTypes.array,
  setKey: PropTypes.func,
  setUserAnswers: PropTypes.func
}

const mapStateToProps = (state) => {
  return { 
    classrooms: state.classrooms,
    submissions: state.submissions
  };
};

const mapDispatchToProps = { setClassrooms, setSubmissions, setUserAnswers, setKey };

export default connect(mapStateToProps, mapDispatchToProps)(Student);