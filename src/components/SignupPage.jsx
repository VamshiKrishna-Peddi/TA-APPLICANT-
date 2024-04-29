import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [signupError, setSignupError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //  password and confirm password match
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    
    setPasswordMatchError(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });

      
      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        setSignupError(JSON.stringify(errorData) || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupError('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form">
        <h1 className="mb-4">Teaching assistant management System Signup</h1>
        <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
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

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordMatchError && (
              <Form.Text className="text-danger">
                Password and confirm password do not match.
              </Form.Text>
            )}
          </Form.Group>
          {signupError && (
            <div className="alert alert-danger" role="alert">
              {signupError}
            </div>
          )}

          <Button variant="primary" type="submit" className="mt-3">
            Signup
          </Button>

          <div className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
