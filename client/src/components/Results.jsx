import React from 'react';
import { ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUserAnswers } from '../redux/actionCreators.js';

class Results extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    axios.post('/api/upload', this.props.file)
      .then((res) => {

        //OPTIMIZATION: have this sorted in the python script, not on the front end.
        let answers = res.data[0].sort((a, b) => {
          return a[0] - b[0];
        });

        this.props.setUserAnswers(answers);

        this.setState({
          loading: false,
        });

      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {

  	const style = {
      list: {
      	//width: '50%'
      }
  	};

    const keyMap = {
      '0': 'A',
      '1': 'B',
      '2': 'C',
      '3': 'D',
      '4': 'invalid'
    };

    if (this.state.loading) {
      return <LoadingSpinner />
    }
    
    return (

  		<Row style={style.list}>
        <ListGroup>

          {this.props.answerKey.map((question, i) => {

			      let header;
            let entry = i < this.props.userAnswers.length ? this.props.userAnswers[i] : undefined;

            if(entry === undefined) {
              header = `${i + 1}) Missing user input.`;
            
            } else if (keyMap[entry[1]] === 'invalid') {
              header = entry[0] + ') Invalid input or deepscan error.';

            } else if (keyMap[entry[1]] === this.props.answerKey[i].letter) {
			      	header = entry[0] + ') ' + keyMap[entry[1]] + ' is correct.';

			      } else {
			      	header = entry[0] + ') ' + keyMap[entry[1]] + ' is incorrect. The correct answer is ' + this.props.answerKey[i].letter + '.';
			      }

          	return <ListGroupItem key={i} header={header} >{question.comments}</ListGroupItem>

          })}

        </ListGroup>
  		</Row>

  	)
  }

}

Results.propTypes = {
  test: PropTypes.string,
  setUserAnswers: PropTypes.func,
  classroom: PropTypes.string,
  answerKey: PropTypes.array,
  userAnswers: PropTypes.array
}

const mapStateToProps = (state) => {
  return { 
    test: state.test,
    userAnswers: state.userAnswers,
    answerKey: state.key,
    classroom: state.classroom,
    file: state.file
  };
};

const mapDispatchToProps = { setUserAnswers };

export default connect(mapStateToProps, mapDispatchToProps)(Results);