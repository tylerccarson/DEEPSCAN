import React from 'react';
import { DropdownButton, MenuItem, Panel, Button, Row, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setFile, setUserAnswers } from '../redux/actionCreators.js';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner.jsx';

class SelectFile extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		redirect: false,
      open: false,
      loading: false
  	};

  	this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()

  	if (this.props.file !== '') {

      this.setState({
        loading: true
      });

      axios.post('/api/upload', this.props.file)
      .then((res) => {

        //OPTIMIZATION: have this sorted in the python script, not on the front end.
        let answers = res.data.answers.sort((a, b) => {
          return a[0] - b[0];
        });

        this.props.setUserAnswers(answers);

        this.setState({
          redirect: true,
        });

      })
      .catch((error) => {
        console.log('error', error);
      });

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

    if (this.state.loading) {
      return <LoadingSpinner />
    }

  	return (
      <div className="select-file">

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

      </div>
  	)
  }
}

SelectFile.propTypes = {
  setFile: PropTypes.func,
  classroom: PropTypes.string,
  test: PropTypes.string,
  setUserAnswers: PropTypes.func
}

const mapStateToProps = (state) => {
	return { 
		file: state.file,
    classroom: state.classroom,
    test: state.test
	};
};

const mapDispatchToProps = { setFile, setUserAnswers };

export default connect(mapStateToProps, mapDispatchToProps)(SelectFile);