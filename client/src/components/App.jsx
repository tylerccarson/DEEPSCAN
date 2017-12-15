import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import { Grid } from 'react-bootstrap'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//TBD... possible implementation of redux
		}
	}

	render() {
		return (
		  <Grid>
		  	<Header />
			  <Main />
      </Grid>
		)
	}

}

export default App;