import React from 'react';
import ReactDOM from 'react-dom';
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//TBD
		}
	}

	render() {
		return (
			<div>
			  <h2>WELCOME TO DEEPSCAN</h2>
			  <h4>Make testing free with this futuristic Scantron Web App</h4>
        <Form inline>
            <ControlLabel>Upload file!</ControlLabel>
            <input
              className="fileInput"
              type="file"
              onChange={(e)=>this.handleImageChange(e)}
            />
        </Form>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));