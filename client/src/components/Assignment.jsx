import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Assignment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>

        <Col smHidden md={2}>
        </Col>

        <Col sm={12} md={8}>
          <Row>
            <Link to="/teacher">
              <Button>Back to other assignments</Button>
            </Link>
          </Row>
  
          <Row>
            <h3>All Student Submissions for: {this.props.test} in {this.props.classroom}</h3>
            <ListGroup>
            {this.props.submissions.map((submission, i) => {

              let date = new Date(submission.updated).toLocaleString('en-US', { hour12: true });

              return <ListGroupItem key={i}>{submission.user.username} submitted: {date}</ListGroupItem>
            })}
            </ListGroup>
          </Row>
        </Col>

        <Col smHidden md={2}>
        </Col>

      </Row>
    )
  }
}

Assignment.propTypes = {
  classroom: PropTypes.string,
  test: PropTypes.string,
  submissions: PropTypes.array
}

const mapStateToProps = (state) => {
  return { 
    classroom: state.classroom,
    test: state.test,
    submissions: state.submissions
  };
};

export default connect(mapStateToProps)(Assignment);