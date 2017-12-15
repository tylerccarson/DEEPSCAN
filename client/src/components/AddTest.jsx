import React from 'react';
import { Button, Row } from 'react-bootstrap';

class AddTest extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		//nothing, possibliy 'open' with a falsy value once button has beeen clicked
  	};
  }

  handleSubmit(e) {
  	e.preventDefault();
  	//orrrr, link to new component? yep.
  }

  render() {
  	return (
  		<Row>
  		  <Button
          className="submitButton"
          type="submit"
          onClick={(e)=>this.handleSubmit(e)}
        >
        Add Test
        </Button>
  		</Row>
  	)
  }
}

export default AddTest;