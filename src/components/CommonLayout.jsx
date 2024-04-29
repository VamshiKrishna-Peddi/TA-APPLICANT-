import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import  UserContext  from '../UserContext'; 

const CommonLayout = ({ children }) => {
    const { user, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();
   
    useEffect(() => {
        if (!user) {
        
          navigate('/login');
        }
      }, [user, navigate]);
      if (!user) {
       
        navigate('/login');
        return;
      }
      const isAdmin = () => {
        
        return user.role === 'A';
      };
      const isInstructor = () => {
       
        return user.role === 'I';
      };
      const isTACommiteeMember = () => {
       
        return user.role === 'TAC';
      };
      const isDepartmentStaff = () => {
       
        return user.role === 'DS';
      };
      const isTAApplicant = () => {
        
        return user.role === 'TA';
      };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Teaching Assistant Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {isTAApplicant() && (<Nav.Link as={Link} to="/applications">
                Application Submission
              </Nav.Link>)}
              {isDepartmentStaff() && (<Nav.Link as={Link} to="/courses-management">
                Course Management
              </Nav.Link>)}
              {isDepartmentStaff() && (<Nav.Link as={Link} to="/recommendation">
                Recommendation
              </Nav.Link>)}
              {isInstructor() && (<Nav.Link as={Link} to="/performance-assessment">
                Performance Assessment
              </Nav.Link>)}
              {isAdmin() || isInstructor() && (<Nav.Link as={Link} to="/view-performance-assessments">
                Past Performance Assessment
              </Nav.Link>)}
              {isTACommiteeMember() || isDepartmentStaff() && (<Nav.Link as={Link} to="/approve">
                Applications
              </Nav.Link>)}
              {isAdmin() && (<Nav.Link as={Link} to="/admin-dashboard">
                Admin Dashboard
              </Nav.Link>)}
              {isAdmin() && (<Nav.Link as={Link} to="/user-management">
                User Management
              </Nav.Link>)}
            </Nav>
            <Nav>
              <NavDropdown title={`Welcome, ${user.username}`} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                {isAdmin() && (<NavDropdown.Item as={Link} to="http://127.0.0.1:8000/admin">
                  User Management
                </NavDropdown.Item>)}
                {isTAApplicant() && (<NavDropdown.Item as={Link} to="/notifications">
                  Notifications
                </NavDropdown.Item>)}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  
        <div style={{ flexGrow: 1, marginTop: 40 }}>
        
          <Container>
            <Row>
              <Col> {children} {/* Content of the current page */}</Col>
            </Row>
          </Container>
        </div>
  
        <footer className="footer mt-auto py-3 bg-light">
          <Container>
            <Row>
              <Col>
                <div className="text-muted">Contact support: support@example.com</div>
              </Col>
              <Col>
                <div className="text-right">
                  <a href="/documentation">Documentation</a> |{' '}
                  <a href="/privacy-policy">Privacy Policy</a> |{' '}
                  <a href="/terms-of-use">Terms of Use</a>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    );
  };
  
  export default CommonLayout;