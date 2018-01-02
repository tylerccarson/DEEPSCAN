import React from 'react';
import { DropdownButton, MenuItem, Panel, Button, Row, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setFile } from '../redux/actionCreators.js';
import axios from 'axios';

class SelectFile extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		redirect: false,
      open: false
  	};

  	this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()

  	if (this.props.file !== '') {
      this.setState({
        redirect: true
      });

      //probably better to put the POST request here, and redirect to results afterwards

  	} else {
  		alert('Please select a file.');
  	}
  }

  handleImageChange(event) {
    event.preventDefault();

    let reader = new FormData();
    reader.append('File', event.target.files[0]);
    reader.append('Classroom', this.props.classroom);
    reader.append('Test', this.props.test);

    this.props.setFile(reader);

  }

  render() {

  	if (this.state.redirect) {
      return (
        <Redirect to="/results"/>
      )
    }

  	return (
  		<Panel>
        <Row>
          <form>
            <FormControl
              type="file"
              onChange={this.handleImageChange}
            />                    
            <Button
              className="submitButton"
              type="submit"
              onClick={this.handleSubmit}
            >
            Submit -->
            </Button>
          </form>
        </Row>
      </Panel>
  	)
  }
}

SelectFile.propTypes = {
  setFile: PropTypes.func,
  classroom: PropTypes.string,
  test: PropTypes.string
}

const mapStateToProps = (state) => {
	return { 
		file: state.file,
    classroom: state.classroom,
    test: state.test
	};
};

const mapDispatchToProps = { setFile };

export default connect(mapStateToProps, mapDispatchToProps)(SelectFile);