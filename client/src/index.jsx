import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './components/Upload.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//TBD... possible implementation of redux
		}
	}

	render() {
		return (
			<div>
			  <h2>WELCOME TO DEEPSCAN</h2>
			  <h4>Make testing free with this futuristic Scantron Web App</h4>
        <Upload />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));