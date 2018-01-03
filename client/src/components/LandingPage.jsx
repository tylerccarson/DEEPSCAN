import React from 'react';
import { FormGroup, Radio, Button, Well } from 'react-bootstrap';
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

      <div className="container">
        <div className="jumbotron">

          <div className="jumbo-header">
            <h1>Welcome to Deepscan</h1>
            <p className="lead">Make testing free with this futuristic Scantron Web App</p>
          </div>

          <form className="role-form">
              <FormGroup>
                <h4>Choose one:</h4>
                <Radio name="radioGroup" value="student" inline defaultChecked onChange={this.handleChange}>
                  Student
                </Radio>
                {' '}
                <Radio name="radioGroup" value="teacher" inline onChange={this.handleChange}>
                  Teacher
                </Radio>
              </FormGroup>
              <a className="btn btn-lg btn-primary" type="submit" onClick={this.submitRole}>
                Submit
              </a>
          </form>

        </div>
  		</div>
  	)
  }
}

export default LandingPage;