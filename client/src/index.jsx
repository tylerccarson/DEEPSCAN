import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './components/Upload.jsx';
import { Grid, Row, Col } from 'react-bootstrap'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//TBD... possible implementation of redux
		}
	}

	render() {

    const style = {
    	title: {
    		color: 'darkBlue'
    	}
    }

		return (
		  <Grid>
		  	<Row>
		  	  <Col md={6} sm={6} xsHidden >
			  		<h2 style={style.title} >WELCOME TO DEEPSCAN</h2>
			  	</Col>
			  </Row>
			  <Row>
			    <Col md={6} sm={6} xsHidden >
			  	  <h4>Make testing free with this futuristic Scantron Web App</h4>
			  	</Col>
			  </Row>
			  <Row>
        	<Upload />
        </Row>
      </Grid>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));