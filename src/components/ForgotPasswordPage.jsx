import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    alert(`A password reset email has been sent to ${email}`);
  };

  return (
    <div className="forgot-password-page-container">
      <div className="forgot-password-form">
        <h1 className="mb-4">Teaching assistant management System Forgot Password</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Reset Password
          </Button>

          <div className="mt-3">
            Remember your password? <Link to="/login">Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
