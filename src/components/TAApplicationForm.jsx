import React, { useState, useContext, useEffect } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from 'react-bootstrap';
import ApplicationConfirmation from './ApplicationConfirmation';
import UserContext from '../UserContext';

const ApplicationForm = () => {
  const { user } = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(user.email);
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cvFile, setCVFile] = useState(null);
  const [hasExperience, setHasExperience] = useState(false);
  const [relevantCourses, setRelevantCourses] = useState([]);
  const [experienceDates, setExperienceDates] = useState('');
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses();
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
  const handleCloseSuccessModal = () => {
    // Reset the form 
    setFullName('');
    // setEmail('');
    setContactNumber('');
    setAddress('');
    setCVFile(null);
    setHasExperience(false);
    setRelevantCourses([]);
    setExperienceDates('');
    setShowSuccessModal(false);
  };
  const handleCloseAlert = () => {
    setError('');
    setShowError(false);
  };
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCVFileChange = (e) => {
    setCVFile(e.target.files[0]);
  };

  const handleExperienceCheckboxChange = (e) => {
    setHasExperience(e.target.checked);
  };

  const handleRelevantCoursesChange = (e) => {
    const selectedCourses = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRelevantCourses(selectedCourses);
  };

  const handleExperienceDatesChange = (e) => {
    setExperienceDates(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!fullName || !email || !contactNumber || !address) {
      setError('Fill the required form fields.');
      setShowError(true);
      return;
    }

    // Email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Fill valid email addres.');
      setShowError(true);
      return;
    }

    // Contact number validation 
    const contactNumberRegex = /^\d{10}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      setError('Fill valid 10 digit contact number.');
      setShowError(true);
      return;
    }

    console.log(
      fullName,
      email,
      contactNumber,
      address,
      cvFile,
      hasExperience,
      relevantCourses,
      experienceDates
    );

    try {
      debugger
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('contact_number', contactNumber);
      formData.append('address', address);
      formData.append('cv_file', cvFile);
      formData.append('user', user.user_id);
      formData.append('relevant_courses', relevantCourses);
      if (hasExperience) {
        formData.append('has_experience', hasExperience);
        
        formData.append('experience_dates', experienceDates);
      }
      const response = await fetch('http://127.0.0.1:8000/api/applications/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });

      if (response.ok) {
        setShowSuccessModal(true);

        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        setError(JSON.stringify(errorData) || 'Form submission failed');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setError('Internal Server error.');
      setShowError(true);
    }
  };

  const renderCourseOptions = () => {
    return courses.map((course) => (
      <option key={course.id} value={course.name}>
        {course.name}
      </option>
    ));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center">TA Applicant's Application Submission</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Alert
              variant="danger"
              show={showError}
              onClose={handleCloseAlert}
              dismissible
            >
              {error}
            </Alert>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="contactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                value={contactNumber}
                onChange={handleContactNumberChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="relevantCourses">
              <Form.Label>Relevant Course</Form.Label>
              <Form.Control
                as="select"
                value={relevantCourses}
                onChange={handleRelevantCoursesChange}
                multiple
              >
                {renderCourseOptions()}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                value={address}
                onChange={handleAddressChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="cvFile">
              <Form.Label>Curriculum Vitae (CV)</Form.Label>
              <Form.Control type="file" onChange={handleCVFileChange} />
            </Form.Group>

            <Form.Group controlId="hasExperience">
              <Form.Check
                type="checkbox"
                label="Previous TA experience at North University"
                checked={hasExperience}
                onChange={handleExperienceCheckboxChange}
              />
            </Form.Group>

            {hasExperience && (
              <>
                <Form.Group controlId="experienceDates">
                  <Form.Label>
                    Dates of previous TA experience with Course Details
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={experienceDates}
                    onChange={handleExperienceDatesChange}
                  />
                </Form.Group>
              </>
            )}

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: '10px' }}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ApplicationConfirmation
            applicantInfo={{
              fullName: fullName,
              email: email,
              contactNumber: contactNumber,
              address: address,
              relevantCourses: relevantCourses,
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ApplicationForm;
