import React from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import FormData from 'form-data';

class Upload extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		open: false,
  		file: ''
  	}

  	this.handleImageChange = this.handleImageChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
  	return (
  		<div>
  			<Form inline>
          <ControlLabel>Upload file!</ControlLabel>
          <input
            className="fileInput"
            type="file"
            onChange={(e)=>this.handleImageChange(e)}
          />
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