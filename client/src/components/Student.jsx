import React from 'react';
import axios from 'axios';
import { Form, FormControl, Button, DropdownButton, Panel, MenuItem, Row, Col } from 'react-bootstrap';
import FormData from 'form-data';
import Results from './Results.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import { setClassrooms } from '../redux/actionCreators.js';
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
            Grade a test
          </Button>
        </Row>

        <Row>
          <a href="./assets/multiplechoice45question.pdf" download>
            <Button>Download an answer sheet</Button>
          </a>
        </Row>

      </div>
		)
  }
}

Student.propTypes = {
  classrooms: PropTypes.array,
  setClassrooms: PropTypes.func
}

const mapStateToProps = (state) => {
  return { 
    classrooms: state.classrooms
  };
};

const mapDispatchToProps = { setClassrooms };

export default connect(mapStateToProps, mapDispatchToProps)(Student);