import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Results extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {

  	const style = {
      list: {
      	//width: '50%'
      }
  	};

    const keyMap = {
      '1': 'A',
      '2': 'B',
      '3': 'C',
      '4': 'D',
      '0': 'invalid'
    };

  	return (
  		<div style={style.list}>
        <ListGroup>

          {this.props.userAnswers.map((entry, i) => {

			      let score;
			      let question = i + 1;

            if (keyMap[entry[1]] === 'invalid') {
              score = entry[0] + ') Invalid input or deepscan error.';

            } else if (keyMap[entry[1]] === this.props.keyAnswers[i /* - 1 ???*/]) {
			      	score = entry[0] + ') ' + keyMap[entry[1]] + ' is correct.';

			      } else {
			      	score = entry[0] + ') ' + keyMap[entry[1]] + ' is incorrect. The correct answer is ' + this.props.keyAnswers[i] + '.';
			      }

          	return <ListGroupItem key={i} >{score}</ListGroupItem>

          })}

        </ListGroup>
  		</div>
  	)
  }

}

export default Results;