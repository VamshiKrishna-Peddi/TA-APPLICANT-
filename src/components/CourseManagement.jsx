import React, { useState, useEffect,useContext } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', code: '', description: '' });
  const [taApplicants, setTaApplicants] = useState([]);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    fetchCourses();
    fetchTaApplicants();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/courses/',{headers: {
        Authorization: `Token ${user.token}`,
      },});
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  const getAssignedTAs = (course) => {
    debugger
    const relevantApplicants = taApplicants.filter((applicant) => {
      return applicant.assigned_course == course.name;
    }
    );
    return relevantApplicants.map((applicant) => applicant.full_name).join(', ');
  };
  const fetchTaApplicants = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/applications/',{headers: {
        Authorization: `Token ${user.token}`,
      },});
      const data = await response.json();
      setTaApplicants(data);
    } catch (error) {
      console.error('Error fetching TA applicants:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/courses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });
      const data = await response.json();
      setCourses([...courses, data]);
      setNewCourse({ name: '', code: '', description: '' });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center mb-4">Course Management</h2>
          
          <h4>Add New Course</h4>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newCourse.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="code">
              <Form.Label>Course Code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={newCourse.code}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newCourse.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ margin: '10px' }}>
              Add Course
            </Button>
          </Form>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Description</th>
                <th>Assigned TAs</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.description}</td>
                  <td>{getAssignedTAs(course)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseManagement;