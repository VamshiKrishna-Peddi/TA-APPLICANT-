import React, { useState, useEffect,useContext } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import UserContext from '../UserContext';

const FeedbackSummaryPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [filteredFeedbackData, setFilteredFeedbackData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        debugger
        const response = await fetch('http://127.0.0.1:8000/api/applications/', {headers: {
          Authorization: `Token ${user.token}`,
        }});
        const data = await response.json();
        debugger
        setFeedbackData(data);
        setFilteredFeedbackData(data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, []); 

  const handleFilterChange = (e) => {
    debugger
    const { name, value } = e.target;
    if (value === '') {
      setFilteredFeedbackData(feedbackData);
    } else {
      const filteredData = feedbackData.filter((feedback) =>
        feedback[name].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFeedbackData(filteredData);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Instructors' Feedback Summary</h1>
          <Form>
            <Form.Group controlId="filterTaName">
              <Form.Label>Filter by TA Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                placeholder="Enter TA name"
                onChange={handleFilterChange}
              />
            </Form.Group>
            <Form.Group controlId="filterCourseName">
              <Form.Label>Filter by Course Name</Form.Label>
              <Form.Control
                type="text"
                name="assigned_course"
                placeholder="Enter course name"
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Form>
          {filteredFeedbackData.map((feedback) => (
            <Card key={feedback.id} className="mb-3">
              <Card.Body>
                <Card.Title>{feedback.full_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{feedback.assigned_course}</Card.Subtitle>
                <Card.Text>{feedback.feedback}</Card.Text>
                <Card.Text>Rating: {feedback.ratings}</Card.Text>
                
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackSummaryPage;
