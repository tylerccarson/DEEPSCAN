import React from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import FormData from 'form-data';
import data from '../data/exampleExamData.js';

class Upload extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		open: false,
  		file: '',
  		section: '',
  		exams: data.exams
  	}

  	this.handleImageChange = this.handleImageChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExamSelection = this.handleExamSelection.bind(this);

  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FormData();
    reader.append('File', e.target.files[0]);

    this.setState({
      file: reader
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleTouchTap();

    axios.post('/api/upload', this.state.file)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  getTests() {
  	//to do
  }

  handleExamSelection(eventKey) {
  	this.setState({
  		section: this.state.exams[eventKey - 1]
  	});
  }

  render() {

  	const style = {
  		form: {
  			display: 'flex',
  			flexDirection: 'column'
  		}
  	}

  	return (
  		<div style={style.form} >
  			<Form>
          <ControlLabel>Upload file!</ControlLabel>
          <input
            className="fileInput"
            type="file"
            onChange={(e)=>this.handleImageChange(e)}
          />
          <DropdownButton title={'Which exam?'} id={1}>
            {this.state.exams.map((exam, i) => {
            	return <MenuItem eventKey={i} key={i} onSelect={this.handleExamSelection} >{exam}</MenuItem>
            })}
          </DropdownButton>
          <div>{this.state.section}</div>
          <Button
            className="submitButton"
            type="submit"
            onClick={(e)=>this.handleSubmit(e)}
            label="Upload Image"
          >
          Submit
          </Button>
      	</Form>
      </div>
		)
  }
}

export default Upload;