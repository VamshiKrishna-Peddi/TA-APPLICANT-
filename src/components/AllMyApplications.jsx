import React, { useState, useEffect, useContext } from 'react';
import { Table, Form } from 'react-bootstrap';
import UserContext from '../UserContext';

const AllMyApplications = () => {
  const [applicants, setApplicants] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/applications/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
          },
        });
        debugger
        let  data = await response.json();
        data = data.filter(d => d.user == user.user_id)
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [user.token]);

  return (
    <div>
      <h1>TA Application Status</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Applied For</th>
            <th>Is Approved</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.pk}>
              <td>{applicant.pk}</td>
              <td>{applicant.full_name}</td>
              <td>{applicant.relevant_courses[0]}</td>
              <td>{applicant.is_approved ? 'Approved' : 'Pending'}</td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllMyApplications;
