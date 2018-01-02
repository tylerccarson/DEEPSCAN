import React from 'react';
import { Form, FormGroup, Radio, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		redirect: false,
  		role: 'student'
  	};

  	this.submitRole = this.submitRole.bind(this);
  	this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //fetch user data, used to display past submissions as student role
  }

  submitRole(e) {
  	e.preventDefault();
  	this.setState({
  		redirect: true
  	});
  }

  handleChange(e) {
  	this.setState({
  		role: e.target.value
  	});
  }

  render() {
  	if (this.state.redirect) {
  	  return (
  	  	<Redirect to={`/${this.state.role}`} />
	  	)
  	}

  	return (
  		<div>
  		  Choose one:
  		  <Form>
  		    <FormGroup>
			      <Radio name="radioGroup" value="student" inline defaultChecked onChange={this.handleChange}>
			        Student
			      </Radio>
			      {' '}
			      <Radio name="radioGroup" value="teacher" inline onChange={this.handleChange}>
			        Teacher
			      </Radio>
			    </FormGroup>
			    <Button type="submit" onClick={this.submitRole}>
			      Submit
			    </Button>
  		  </Form>
  		</div>
  	)
  }
}

export default LandingPage;