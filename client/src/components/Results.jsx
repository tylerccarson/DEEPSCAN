import React from 'react';
import { ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const keyMap = {
      '0': 'A',
      '1': 'B',
      '2': 'C',
      '3': 'D',
      '4': 'invalid'
    };
    
    return (
      <Row>

        <Col smHidden md={2}>
        </Col>

        <Col sm={12} md={8}>

          <Row>
            <Link to="/student">
              <Button>Back to other submissions</Button>
            </Link>
          </Row>

          <Row>
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

        </Col>

        <Col smHidden md={2}>
        </Col>

      </Row>
    )
  }

}

Results.propTypes = {
  test: PropTypes.string,
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

export default connect(mapStateToProps)(Results);