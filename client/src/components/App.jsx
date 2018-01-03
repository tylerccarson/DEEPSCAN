import React from 'react';
import Main from './Main.jsx';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../redux/store.js';

const App = () => {
    return (
      <Provider store={store}>
        <Grid>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">DeepScan</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="/">Home</NavItem>
              <NavItem eventKey={2} href="/logout" >Log Out</NavItem>
            </Nav>
          </Navbar>
          <Main />
        </Grid>
      </Provider>
    );
};

export default App;