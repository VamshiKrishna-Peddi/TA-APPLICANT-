import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

const DashboardOverview = () => {
  const [courses, setCourses] = useState([]);
  const [taApplicants, setTaApplicants] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Total Applicants',
      description: 'Loading...',
    },
    {
      id: 2,
      title: 'Recommendation Approval',
      description: 'Loading...',
    },
  ]);

  useEffect(() => {
    fetchTaApplicants();
    fetchCourses();
  }, []);

  const { user } = useContext(UserContext);

  const fetchTaApplicants = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/applications/', {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });

      const data = await response.json();
      const pendingApproval = data.filter(
        (d) => d.assigned_course.length > 0 && !d.is_reviewed
      );

      setNotifications([
        {
          id: 1,
          title: 'Total Applicants',
          description: 'Total applicants count ' + data.length,
        },
        {
          id: 2,
          title: 'Recommendation Approval',
          description:
            'There are ' + pendingApproval.length + ' pending approvals.',
        },
      ]);
      setTaApplicants(data);
    } catch (error) {
      console.error('Error fetching TA applicants:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/courses/', {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Administrator Dashboard Overview</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Key Metrics</Card.Title>
              <Card.Text>
                Total Courses: <Badge variant="primary">{courses.length}</Badge>
              </Card.Text>
              <Card.Text>
                Total TAs:{' '}
                <Badge variant="secondary">{taApplicants.length}</Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Quick Access</Card.Title>
              <Card.Text>
                <Nav.Link as={Link} to="/courses-management">
                  Course Management
                </Nav.Link>
              </Card.Text>
              <Card.Text>
                <Nav.Link as={Link} to="/view-performance-assessments">
                  Recommendation Summary
                </Nav.Link>
              </Card.Text>
              <Card.Text>
                <Nav.Link as={Link} to="/approve">
                  Decision Management
                </Nav.Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Notifications</h2>
          {Array.isArray(notifications) &&
            notifications.map((notification) => (
              <Card key={notification.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{notification.title}</Card.Title>
                  <Card.Text>{notification.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardOverview;
