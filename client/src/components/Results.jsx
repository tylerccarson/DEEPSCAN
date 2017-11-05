import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Results extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {

  	const style = {
      list: {
      	width: '50%'
      }
  	};

  	return (
  		<div style={style.list}>
        <ListGroup>

          {this.props.userAnswers.map((entry, i) => {

			      var score;
			      var question = i + 1;
			      if (entry === this.props.keyAnswers[i]) {
			      	score = question + ') ' + entry + ' is correct.';
			      } else {
			      	score = question + ') ' + entry + ' is incorrect. The correct answer is ' + this.props.keyAnswers[i] + '.';
			      }

          	return <ListGroupItem key={i} >{score}</ListGroupItem>

          })}

        </ListGroup>
  		</div>
  	)
  }

}

export default Results;