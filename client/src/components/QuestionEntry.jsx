import React from 'react';
import { Button, Row, ListGroup, ListGroupItem, Radio, FormGroup, FieldGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { setLetter, editComments } from '../redux/actionCreators.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionEntry extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
	}

	handleChange(event) {
		//use setLetter function to dispatch the action
		let letter = event.target.value;
		console.log(letter);
		let index = this.props.i;
		console.log(index);
		this.props.setLetter(letter, index);
	}

	handleTyping(event) {
		console.log(event.target.value);
		this.props.editComments(event.target.value, this.props.i);
	}

  render() {
  	return (
  		<ListGroupItem>
  		  <h4>{`${this.props.i + 1})`}</h4>
		  	<FormGroup>
		  	  <ControlLabel>Pick one:</ControlLabel>
		  	  {' '}
		      <Radio value="A" name={`radioGroup${this.props.i}`} inline defaultChecked={true} onClick={this.handleChange}>
		        A
		      </Radio>
		      {' '}
		      <Radio value="B" name={`radioGroup${this.props.i}`} inline onClick={this.handleChange} >
		        B
		      </Radio>
		      {' '}
		      <Radio value="C" name={`radioGroup${this.props.i}`} inline onClick={this.handleChange} >
		        C
		      </Radio>
		      {' '}
		      <Radio value="D" name={`radioGroup${this.props.i}`} inline onClick={this.handleChange} >
		        D
		      </Radio>
		    </FormGroup>
		    <FormGroup>
          <ControlLabel>Comments:</ControlLabel>
          <FormControl
            type="text"
            value={this.props.questions[this.props.i].comments}
            onChange={this.handleTyping}
          />
        </FormGroup>
	    </ListGroupItem>
  	)
  }
}

QuestionEntry.propTypes = {
	i: PropTypes.number,
	question: PropTypes.object,
	questions: PropTypes.array,
	setLetter: PropTypes.func,
	editComments: PropTypes.func
}

const mapStateToProps = (state) => {
  return { questions: state.questions };
};

const mapDispatchToProps = { setLetter, editComments };

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEntry);