import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ApplicationConfirmation = ({ applicantInfo }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center mb-4">Application Submitted</h2>
          <p className="lead text-center">Thank you for submitting your application!</p>
          <hr />
          <h4>Summary of Submitted Information:</h4>
          <ul>
            <li>
              <strong>Full Name:</strong> {applicantInfo.fullName}
            </li>
            <li>
              <strong>Email:</strong> {applicantInfo.email}
            </li>
            <li>
              <strong>Contact Number:</strong> {applicantInfo.contactNumber}
            </li>
            <li>
              <strong>Address:</strong> {applicantInfo.address}
            </li>
            <li>
              <strong>Relevant Course:</strong> {applicantInfo.relevantCourses.join(', ')}
            </li>
          </ul>
          <hr />
          <p>
            We appreciate your interest in becoming a Teaching Assistant at North University. Your application will be
            carefully reviewed. If you are shortlisted, we will contact you with further information regarding the next
            steps in the application process.
          </p>
          <p>
            In the meantime, if you have any questions or need further assistance, please feel free to contact our
            TA Application Support team at support@example.com.
          </p>
         
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationConfirmation;