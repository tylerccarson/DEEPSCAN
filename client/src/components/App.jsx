import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import { Grid } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../redux/store.js';

const App = () => {
		return (
			<Provider store={store}>
			  <Grid>
			  	<Header />
				  <Main />
	      </Grid>
      </Provider>
		);
};

export default App;