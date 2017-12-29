import React from 'react';
import { DropdownButton, MenuItem, Panel, Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setClassroom, setTests } from '../redux/actionCreators.js';
import axios from 'axios';

class SelectClassroom extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		redirect: false
  	};

  	this.handleSelection = this.handleSelection.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelection(eventKey, event) {
    this.props.setClassroom(this.props.classrooms[eventKey]);
  }

  handleSubmit() {

  	if (this.props.classroom !== '') {
  		axios.get('/tests', {
  			params: {
  				classroom: this.props.classroom
  			}
  		})
  		  .then((res) => {
  				this.props.setTests(res.data);
  				this.setState({
  					redirect: true
  				})
  		  })
  		  .catch((err) => {
  		  	console.log(err);
  		  })
  	} else {
  		alert('Please select a classroom.');
  	}
  }

  render() {

  	if (this.state.redirect) {
      return (
        <Redirect to="/selectTest"/>
      )
    }

  	return (
  		<Panel>
	  		<form>
	  		  <Row>
			  		<DropdownButton title={'Which classroom?'} id={1}>
			        {this.props.classrooms.map((classroom, i) => {
			        	return <MenuItem name='classroom' eventKey={i} key={i} onSelect={this.handleSelection} >{classroom}</MenuItem>
			        })}
			      </DropdownButton>
			      {' ' + this.props.classroom}
		      </Row>
		      <Row>
		        <Button onClick={this.handleSubmit}>
		          Next ->
		        </Button>
	        </Row>
	      </form>
      </Panel>
  	)
  }
}

SelectClassroom.propTypes = {
  classroom: PropTypes.string,
  classrooms: PropTypes.array,
  setClassroom: PropTypes.func,
  setTests: PropTypes.func
}

const mapStateToProps = (state) => {
	return { 
		classroom: state.classroom,
		classrooms: state.classrooms,
		tests: state.tests
	};
};

const mapDispatchToProps = { setClassroom, setTests };

export default connect(mapStateToProps, mapDispatchToProps)(SelectClassroom);