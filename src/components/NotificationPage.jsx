import React, { useState } from 'react';
import { Container, Row, Col, Alert, Button, Modal, Tooltip } from 'react-bootstrap';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      status: 'Successful',
      courseAssignment: 'Introduction to Computer Science',
      instructions: '....',
    },
    {
      id: 2,
      status: 'Not Successful',
      courseAssignment: '',
      instructions: '',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});

  const handleAccept = (notification) => {
    
    console.log('Accepted notification:', notification);
  };

  const handleDecline = (notification) => {
   
    console.log('Declined notification:', notification);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Notification Page</h1>
          {notifications.map((notification) => (
            <Alert
              key={notification.id}
              variant={notification.status === 'Successful' ? 'success' : 'danger'}
              onClick={() => handleNotificationClick(notification)}
              style={{ cursor: 'pointer' }}
            >
              {notification.status === 'Successful' ? 'Congratulations!' : 'We regret to inform you.'}
              <br />
              {notification.courseAssignment && (
                <>
                  Course Assignment: {notification.courseAssignment}
                  <br />
                </>
              )}
              {notification.instructions && <>Instructions: {notification.instructions}</>}
            </Alert>
          ))}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Status: {selectedNotification.status}</p>
          {selectedNotification.courseAssignment && (
            <p>Course Assignment: {selectedNotification.courseAssignment}</p>
          )}
          {selectedNotification.instructions && (
            <p>Instructions: {selectedNotification.instructions}</p>
          )}
          <Button variant="success" onClick={() => handleAccept(selectedNotification)}>
            Accept
          </Button>
          <Button variant="danger" onClick={() => handleDecline(selectedNotification)}>
            Decline
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default NotificationPage;