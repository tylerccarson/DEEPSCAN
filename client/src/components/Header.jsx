import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'

class Header extends React.Component {
  render() {

    const style = {
    	title: {
    		color: 'darkBlue',
        textAlign: 'center'
    	},
      subtitle: {
        textAlign: 'center'
      },
      logout: {
        textAlign: 'right',
        margin: '5px'
      }
    };

  	return (
  		<div>

        <Row>
			  	<Col md={12} sm={12} style={style.logout}>
            <Button href="/logout">Log Out</Button>
          </Col>
        </Row>

        <Row>
          <Col md={12} sm={12} style={style.title}>
            <h2>WELCOME TO DEEPSCAN</h2>
          </Col>
        </Row>

        <Row>
          <Col md={12} sm={12} style={style.subtitle}>
            <h4>Make testing free with this futuristic Scantron Web App</h4>
          </Col>
			  </Row>

		  </div>
  	)
  }
}

export default Header;