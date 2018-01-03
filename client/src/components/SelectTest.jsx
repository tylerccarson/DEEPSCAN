import React from 'react';
import { DropdownButton, MenuItem, Panel, Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setTest, setKey } from '../redux/actionCreators.js';
import axios from 'axios';

class SelectTest extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		redirect: false
  	};

  	this.handleSelection = this.handleSelection.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelection(eventKey, event) {
    this.props.setTest(this.props.tests[eventKey]);
  }

  handleSubmit() {

  	if (this.props.test !== '') {
      axios.get('/key', {
        params: {
          classroom: this.props.classroom,
          test: this.props.test
        }
      })
        .then((res) => {
          this.props.setKey(res.data);
    			this.setState({
    				redirect: true
    			})
        })
        .catch((err) => {
          console.log(err);
        });
  	} else {
  		alert('Please select a test.');
  	}
  }

  render() {

  	if (this.state.redirect) {
      return (
        <Redirect to="/selectFile"/>
      )
    }

    let title = this.props.test !== '' ? this.props.classroom : 'Which test?';

  	return (
      <div className="select-test">
    		<Panel>
  	  		<form>
  	  		  <Row>
  			  		<DropdownButton title={title} id={2}>
  			        {this.props.tests.map((test, i) => {
  			        	return <MenuItem name='test' eventKey={i} key={i} onSelect={this.handleSelection} >{test}</MenuItem>
  			        })}
  			      </DropdownButton>
  		      </Row>
  		      <Row>
  		        <Button onClick={this.handleSubmit}>
  		          Next ->
  		        </Button>
  	        </Row>
  	      </form>
        </Panel>
      </div>
  	)
  }
}

SelectTest.propTypes = {
  tests: PropTypes.array,
  test: PropTypes.string,
  setTest: PropTypes.func,
  classroom: PropTypes.string,
  answerKey: PropTypes.array
}

const mapStateToProps = (state) => {
	return { 
		test: state.test,
		tests: state.tests,
    answerKey: state.key,
    classroom: state.classroom
	};
};

const mapDispatchToProps = { setTest, setKey };

export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);