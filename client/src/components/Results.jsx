import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Results extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {

  	var userAnswers = this.props.userAnswers;
  	var keyAnswers = this.props.keyAnswers;
    var scores = userAnswers.map((entry, i) => {
      var score;
      if (entry === keyAnswers[i]) {
      	score = entry + ' is correct.';
      } else {
      	score = entry + ' is incorrect. The correct answer is ' + keyAnswers[i];
      }
      return <div>{score}</div>
    });

  	return (
  		<div>
  			{scores}
  		</div>
  	)

  }

}

export default Results;