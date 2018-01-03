import React from 'react';
import { Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Assignment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <Row>
          <Link to="/teacher">
            <Button>Back to other assignments</Button>
          </Link>
        </Row>

        <Row>
          All Student Submissions for: {this.props.classroom} {this.props.test}
          <ListGroup>
          {this.props.submissions.map((submission, i) => {

            let date = new Date(submission.updated).toLocaleString('en-US', { hour12: true });

            return <ListGroupItem key={i}>{submission.user.username} submitted: {date}</ListGroupItem>
          })}
          </ListGroup>
        </Row>

      </div>
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