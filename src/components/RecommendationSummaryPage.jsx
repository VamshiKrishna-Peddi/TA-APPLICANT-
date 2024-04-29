import React, { useState, useContext, useEffect } from 'react';
import { Card, Button, Dropdown, Form, Modal, Tooltip } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const RecommendationSummaryPage = () => {
  const [courses, setCourses] = useState([]);
  const [taApplicants, setTaApplicants] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  useEffect(() => {
    fetchCourses();
    fetchTaApplicants();
  }, []);

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
  const getAssignedTAs = (course) => {
 
    const relevantApplicants = taApplicants.filter((applicant) => {
      return applicant.assigned_course == course.name;
    });
    return relevantApplicants
      .map((applicant) => applicant.full_name)
      .join(', ');
  };
  const getRecommendedTAs = (course) => {
 
    const relevantApplicants = taApplicants.filter((applicant) => {
      return applicant.relevant_courses.includes(course.name);
    });
    return relevantApplicants
      .map((applicant) => applicant.full_name)
      .join(', ');
  };
  const fetchTaApplicants = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/applications/', {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      const data = await response.json();
      setTaApplicants(data);
    } catch (error) {
      console.error('Error fetching TA applicants:', error);
    }
  };



  const handleAlternateTASelect = async (index, selectedTA) => {
    debugger
    try {
     
      const applicantToUpdate = taApplicants.find((ta) => ta.full_name === selectedTA);
      
     
      const updatedApplicant = { ...applicantToUpdate, assigned_course: courses[index].name };

     
      const updatedTaApplicants = taApplicants.map((ta) =>
        ta.id === updatedApplicant.id ? updatedApplicant : ta
      );
     

      // API call to update the assigned_course on the server
      await fetch(`http://127.0.0.1:8000/api/applications/${updatedApplicant.pk}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          assigned_course: updatedApplicant.assigned_course
        }),
      });
      
      fetchCourses();
      fetchTaApplicants();
     
    } catch (error) {
      console.error('Error updating assigned_course:', error);
      
    }
    
  };

 

  return (
    <div>
      <h1>Recommendation Summary</h1>
      {courses.map((course, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>{course.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Recommended TA(s): {getRecommendedTAs(course)}
            </Card.Subtitle>
            <Card.Text>Course Description: {course.description}</Card.Text>
            <Card.Text>Assigned Ta(s): {getAssignedTAs(course)}</Card.Text>
            
            <Dropdown style={{margin: 10, display: 'inline-block'}}>
              <Dropdown.Toggle variant="secondary" id={`dropdown-${index}`}>
                Select Alternate TA
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {taApplicants.map((ta, taIndex) => (
                  <Dropdown.Item
                    key={taIndex}
                    onClick={() => handleAlternateTASelect(index, ta.full_name)}
                  >
                    {ta.full_name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
        </Card>
      ))}
      
    </div>
  );
};

export default RecommendationSummaryPage;
