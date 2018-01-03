import React from 'react';
import axios from 'axios';
import { Form, FormControl, Button, DropdownButton, Panel, MenuItem, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import FormData from 'form-data';
import Results from './Results.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import { setAssignments, setSubmissions, setTest, setClassroom } from '../redux/actionCreators.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }

    this.getAssignments = this.getAssignments.bind(this);
    this.goToAssignment = this.goToAssignment.bind(this);
  }

  getAssignments() {
    axios.get('/teacher/assignments')
      .then((res) => {
        this.props.setAssignments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goToAssignment(index) {

    let test = this.props.assignments[index].test;
    let classroom = this.props.assignments[index].classroom;

    axios.get('/assignment/submissions', {
      params: {
        test: test,
        classroom: classroom
      }
    })
      .then((res) => {

        this.props.setTest(test);
        this.props.setClassroom(classroom);
        this.props.setSubmissions(res.data);

        this.setState({
          redirect: true
        });

      });
  }

  componentDidMount() {
    this.getAssignments();
  }

  render() {

    const style = {
      button: {
        margin: '5px'
      }
    }

    if (this.state.redirect) {
      return (
        <Redirect to="/assignment"/>
      )
    }

    return (

      <div>

        <Row>

          <Col sm={12} md={6}>
            <Link to="/createTest">
              <Button style={style.button}>Create a new assignment</Button>
            </Link>

            <Link to="/student">
              <Button style={style.button}>Switch to student role</Button>
            </Link>
          </Col>

        </Row>

        <Row>

          <Col sm={12} md={6}>
            <h3>Teacher Assignments:</h3>
            <ListGroup>
            {this.props.assignments.map((assignment, i) => {
              return <ListGroupItem key={i} header={assignment.classroom} onClick={() => this.goToAssignment(i)}>{assignment.test}</ListGroupItem>
            })}
            </ListGroup>
          </Col>

        </Row>

      </div>
    )
  }
}

Teacher.propTypes = {
  assignments: PropTypes.array,
  setAssignments: PropTypes.func,
  setSubmissions: PropTypes.func,
  submissions: PropTypes.array,
  setTest: PropTypes.func,
  setClassroom: PropTypes.func,
  test: PropTypes.string,
  classroom: PropTypes.string
}

const mapStateToProps = (state) => {
  return { 
    assignments: state.assignments,
    submissions: state.submissions,
    test: state.test,
    classroom: state.classroom
  };
};

const mapDispatchToProps = { setAssignments, setSubmissions, setTest, setClassroom };

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);