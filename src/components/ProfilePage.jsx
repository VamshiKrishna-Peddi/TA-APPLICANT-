import React from 'react';
import { Card } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    //  user profile data from the API endpoint
    fetch('http://127.0.0.1:8000/api/profile', {
      method: 'GET',
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '28rem' }}>
        <Card.Body>
          <Card.Title>Profile Page</Card.Title>
          <Card.Text>
            <p>Username: {profileData.username}</p>
            <p>Email: {profileData.email}</p>
            <p>Role: {profileData.role}</p>
            <p>Last Login: {profileData.last_login}</p>
            <p>Date Joined: {profileData.date_joined}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
