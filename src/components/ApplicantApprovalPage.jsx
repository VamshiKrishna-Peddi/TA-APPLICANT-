import React, { useState, useEffect, useContext } from 'react';
import { Table, Form } from 'react-bootstrap';
import UserContext from '../UserContext';

const ApplicantApprovalPage = () => {
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
        const data = await response.json();
        console.log("User Data", data);
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [user.token]);

  const handleApprovalChange = async (applicantId, isApproved) => {
    try {
      const updatedApplicants = applicants.map((applicant) =>
        applicant.pk === applicantId ? { ...applicant, is_approved: isApproved } : applicant
      );
      console.log(updatedApplicants)
      setApplicants(updatedApplicants);

      await fetch(`http://127.0.0.1:8000/api/applications/${applicantId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          is_approved: isApproved,
        }),
      });

     
    } catch (error) {
      console.error('Error updating is_approved:', error);
     
    }
  };

  return (
    <div>
      <h1>TA Application Approval</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Resume</th>
            <th>Ratings</th>
            <th>Feedback</th>
            <th>Is Approved</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.pk}>
              <td>{applicant.pk}</td>
              <td>{applicant.full_name}</td>
              <td ><a href={applicant.cv_file}>{applicant.full_name}</a></td>
              <td>{'★'.repeat(applicant.ratings)}</td>
              <td>{applicant.feedback}</td>
              <td>
                
                <Form.Check
                  type="checkbox"
                  checked={applicant.is_approved}
                  onChange={(e) => handleApprovalChange(applicant.pk, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicantApprovalPage;
