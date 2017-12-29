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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getClassrooms = this.getClassrooms.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleTouchTap();

    if (this.state.exam !== '' && this.state.version !== '' && this.state.section !== '' && this.state.file !== '') {

      let options = {
        exam: this.state.exam,
        version: this.state.version,
        section: this.state.section
      }

      let key;

      axios.get('/key', {
          params: options
        })
        .then((res) => {
          key = res.data;

          this.setState({
            loading: true,
            redirect: true
          });

          //this function must be send to the results page, along with the loading spinner
          axios.post('/api/upload', this.state.file)
            .then((res) => {

              //OPTIMIZATION: have this sorted in the python script, not on the front end.
              let answers = res.data[0].sort((a, b) => {
                return a[0] - b[0];
              });

              this.setState({
                loading: false,
              	userAnswers: answers,
                keyAnswers: key
              })
            })
            .catch((error) => {
              console.log('error', error);
            });
        })

    } else {
      alert('Not all fields have been completed. Try again.');
    }

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