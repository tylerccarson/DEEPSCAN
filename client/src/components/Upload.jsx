import React from 'react';
import axios from 'axios';
import { Form, FormControl, Button, DropdownButton, Panel, MenuItem, Row, Col } from 'react-bootstrap';
import FormData from 'form-data';
import Results from './Results.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

class Upload extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		open: false,
  		file: '',
      exam: '',
      version: '',
  		section: '',
  		exams: [],
      versions: [],
      sections: [],
  		keyAnswers: [],
  		userAnswers: [],
      loading: false
  	}

  	this.handleImageChange = this.handleImageChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelection = this.handleSelection.bind(this);

  }

  componentWillMount() {
    axios.get('/exams')
      .then((data) => {

        let hash = {
          exams: {},
          versions: {},
          sections: {}
        };

        for (var i = 0; i < data.data.length; i++) {
          if (hash.exams[data.data[i].exam] === undefined) {
            hash.exams[data.data[i].exam] = i;
          }
          if (hash.versions[data.data[i].number] === undefined) {
            hash.versions[data.data[i].number] = i;
          }
          if (hash.sections[data.data[i].section] === undefined) {
            hash.sections[data.data[i].section] = i;
          }
        }

        this.setState({
          exams: Object.keys(hash.exams),
          versions: Object.keys(hash.versions),
          sections: Object.keys(hash.sections)
        });

      })
      .catch((err) => {
        console.log(err);
      });
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

    if (this.state.exam !== '' && this.state.version !== '' && this.state.section !== '' && this.state.file !== '') {

      let options = {
        exam: this.state.exam,
        version: this.state.version,
        section: this.state.section
      }

      let key;

      axios.get('/key', {
          params: options
        })
        .then((res) => {
          key = res.data;

          this.setState({
            loading: true
          });

          axios.post('/api/upload', this.state.file)
            .then((res) => {

              //OPTIMIZATION: have this sorted in the python script, not on the front end.
              let answers = res.data[0].sort((a, b) => {
                return a[0] - b[0];
              });

              this.setState({
                loading: false,
              	userAnswers: answers,
                keyAnswers: key
              })
            })
            .catch((error) => {
              console.log('error', error);
            });
        })

    } else {
      alert('Not all fields have been completed. Try again.');
    }

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

  handleSelection(eventKey, event) {
    this.setState({
      [event.target.name]: this.state[event.target.name + 's'][eventKey]
    });
  }


  render() {

  	const style = {
  		form: {}
  	}

    let results;

    if (this.state.loading) {
      results = <LoadingSpinner />
    } else {
      results = <Results 
        section={this.state.section} 
        keyAnswers={this.state.keyAnswers}
        userAnswers={this.state.userAnswers} 
      />
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
                      {this.state.exams.map((exam, i) => {
                        return <MenuItem name='exam' eventKey={i} key={i} onSelect={this.handleSelection} >{exam}</MenuItem>
                      })}
                    </DropdownButton>
                    <div>{this.state.exam}</div>

                    <DropdownButton title={'Which version?'} id={2}>
					            {this.state.versions.map((version, i) => {
					            	return <MenuItem name='version' eventKey={i} key={i} onSelect={this.handleSelection} >{version}</MenuItem>
					            })}
					          </DropdownButton>
                    <div>{this.state.version}</div>

                    <DropdownButton title={'Which section?'} id={3}>
                      {this.state.sections.map((section, i) => {
                        return <MenuItem name='section' eventKey={i} key={i} onSelect={this.handleSelection} >{section}</MenuItem>
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
                      disabled={this.state.loading}
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
	        {results}
	      </Row>
      </div>
		)
  }
}

export default Upload;