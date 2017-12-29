import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import Student from './Student.jsx';
import Teacher from './Teacher.jsx';
import CreateTest from './CreateTest.jsx';
import SelectClassroom from './SelectClassroom.jsx';
import SelectTest from './SelectTest.jsx';
import SelectFile from './SelectFile.jsx';
import Results from './Results.jsx';
import { Row, Col } from 'react-bootstrap';

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
  		      	<Student />
  		      )}
  		    />
          <Route
            path='/selectClassroom'
            render={() => (
              <SelectClassroom />
            )}
          />
          <Route
            path='/selectTest'
            render={() => (
              <SelectTest />
            )}
          />
          <Route
            path='/selectFile'
            render={() => (
              <SelectFile />
            )}
          />
          <Route
            path="/results"
            render={() => (
              <Results />
            )}
          />
  		    <Route 
  		      path="/teacher"
  		      render={() => (
  		      	<Teacher />
  		      )}
  		    />
          <Route
            path="/createTest"
            render={() => (
              <CreateTest />
            )}
          />

  		  </Switch>
      </div>
  	)
  }
}

export default Main;