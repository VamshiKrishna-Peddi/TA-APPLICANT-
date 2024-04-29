import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const PerformanceAssessmentPage = () => {
  const [taApplicants, setTaApplicants] = useState([]);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchTaApplicants();
  }, []);

  const [assessments, setAssessments] = useState([]);

  const handleAssessmentChange = (taId, e) => {
    debugger;
    const { name, value } = e.target;
    setAssessments((prevAssessments) => {
      const updatedAssessments = [...prevAssessments];
      const taIndex = updatedAssessments.findIndex(
        (assessment) => assessment.taId === taId
      );
      if (taIndex !== -1) {
        updatedAssessments[taIndex][name] = value;
      } else {
        updatedAssessments.push({ taId, [name]: value });
      }
      return updatedAssessments;
    });
  };
  const fetchTaApplicants = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/applications/', {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      let data = await response.json();
      debugger;
      data = data.filter(
        (d) => d.assigned_course.length > 0 && d.is_reviewed == false
      );
      setTaApplicants(data);
    } catch (error) {
      console.error('Error fetching TA applicants:', error);
    }
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();

    console.log('Assessments:', assessments);
    try {
      for (let assm of assessments) {
        const applicantToUpdate = assm.taId;

        // update the feedback and ratings for the selected applicant
        const updatedApplicant = {
          feedback: assm.feedback,
          ratings: assm.rating,
          is_reviewed: true,
        };

        // API call to update feedback and ratings on the server
        await fetch(`http://127.0.0.1:8000/api/applications/${assm.taId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
          },
          body: JSON.stringify({
            feedback: updatedApplicant.feedback,
            ratings: updatedApplicant.ratings,
            is_reviewed: true,
          }),
        });
      }
      alert('Success updating feedback and ratings');
      navigate('/view-performance-assessments');
    } catch (error) {
      console.error('Error updating feedback and ratings:', error);
      alert('Error updating feedback and ratings');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Instructors' Performance Assessment</h1>
          <Form onSubmit={handleSubmit}>
            {taApplicants.map((ta) => (
              <Card key={ta.id} className="mb-3">
                <Card.Body>
                  <Card.Title>TA Name: {ta.full_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Course Name: {ta.assigned_course}
                  </Card.Subtitle>
                  <Form.Group controlId={`feedback-${ta.id}`}>
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="feedback"
                      onChange={(e) => handleAssessmentChange(ta.pk, e)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`rating-${ta.id}`}>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      name="rating"
                      onChange={(e) => handleAssessmentChange(ta.pk, e)}
                    >
                      <option value="">Select rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                </Card.Body>
              </Card>
            ))}
            <Button variant="primary" type="submit">
              Submit Assessment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PerformanceAssessmentPage;
