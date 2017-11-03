import React from 'react';
import axios from 'axios';
import { Form, FormControl, Button, DropdownButton, Panel, MenuItem, Row, Col } from 'react-bootstrap';
import FormData from 'form-data';
import data from '../data/examData.js';
import Results from './Results.jsx';

class Upload extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		open: false,
  		file: '',
  		section: '',
  		exams: data,
  		keyAnswers: [],
  		userAnswers: []
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
        this.setState({
        	userAnswers: res.data
        })
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

  handleExamSelection(eventKey) {
    let section = this.state.exams.exams[eventKey];
  	this.setState({
  		section: section,
  		keyAnswers: this.state.exams.keys[section]
  	});
  }

  render() {

  	const style = {
  		form: {
  			// display: 'flex',
  			// flexDirection: 'column'
  		}
  	}

  	return (
      <div>
	  		<Row style={style.form} >
	  		  <Col md={6} sm={6} xsHidden>
			  		<Panel>
			  		  <Row>
				  			<Form>
				  			  <Col md={6} sm={6} xs={6} >
					          <FormControl
					            type="file"
					            onChange={(e)=>this.handleImageChange(e)}
					          />
					          <DropdownButton title={'Which exam?'} id={1}>
					            {this.state.exams.exams.map((exam, i) => {
					            	return <MenuItem eventKey={i} key={i} onSelect={this.handleExamSelection} >{exam}</MenuItem>
					            })}
					          </DropdownButton>
					          <div>{this.state.section}</div>
				          </Col>
				          <Col md={6} sm={6} xs={6} >
					          <Button
					            className="submitButton"
					            type="submit"
					            onClick={(e)=>this.handleSubmit(e)}
					            label="Upload Image"
					          >
					          Submit
					          </Button>
				          </Col>
				      	</Form>
		          </Row>
			      </Panel>
		      </Col>
	      </Row>
	      <Row>
	        <Results 
	          section={this.state.section} 
	          keyAnswers={this.state.keyAnswers}
	          userAnswers={this.state.userAnswers} 
	        />
	      </Row>
      </div>
		)
  }
}

export default Upload;