import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Results extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {

  	return (
  		<div>
        <ListGroup>

          {this.props.userAnswers.map((entry, i) => {

			      var score;
			      if (entry === keyAnswers[i]) {
			      	score = entry + ' is correct.';
			      } else {
			      	score = entry + ' is incorrect. The correct answer is ' + keyAnswers[i];
			      }

          	return <ListGroupItem>{score}</ListGroupItem>

          })}

        </ListGroup>
  		</div>
  	)
  }

}

export default Results;