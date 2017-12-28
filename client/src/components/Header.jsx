import React from 'react';
import { Row, Col } from 'react-bootstrap'

class Header extends React.Component {
  render() {

    const style = {
    	title: {
    		color: 'darkBlue'
    	}
    };

  	return (
  		<div>
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
		  </div>
  	)
  }
}

export default Header;