import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import Upload from './Upload.jsx';
import AddTest from './AddTest.jsx';
import { Row, Col } from 'react-bootstrap'

class Main extends React.Component {

  render() {
  	return (
  		<div>
  		  <Switch>
  		    <Route
  		      exact path="/"
  		      render={() => (
  		      	<LandingPage />
  		      )}
  		    />
  		    <Route 
  		      path="/student"
  		      render={() => (
  		      	<Upload />
  		      )}
  		    />
  		    <Route 
  		      path="/teacher"
  		      render={() => (
  		      	<AddTest />
  		      )}
  		    />
  		  </Switch>
      </div>
  	)
  }
}

export default Main;