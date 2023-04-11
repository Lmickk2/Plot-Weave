import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Helmet } from "react-helmet";

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const [showThoughts, setShowThoughts] = useState(false);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }
  
  const toggleThoughts = () => {
    setShowThoughts(!showThoughts);
  };


  if (loading) {
    return <div class="spinner">
    <div class="spinner1"></div>
  </div>;
  }

  // if (!user?.username) {
  //   return (
  //    <NotAuthorized/>
  //   );
  // }

  return (
    <div className="appear"> 
      <Helmet>
          <title>Plot Weave | Profile</title>
      </Helmet>
      <div>
        <div className="profile-container">
          <h1>Hello, {user.username}</h1>
          <div className="profile-info">
            {/* <img src={profilePicture} className="profile-img" alt="" /> */}
            <div className="user-details">
              <p className="username"><b>{user.username}</b></p>
              <p>Front End Software Engineer. Here to answer questions!</p>
            </div>
            <div className="user-answers">
              <h3>Recently Asked Questions</h3>
              <hr/>
            </div>
            <button className="toggle-thoughts" onClick={toggleThoughts}>
                {showThoughts ? <span>Collapse &#8613;</span> : <span>Expand &#8615;</span>}
              </button>
            <div className="recently-answered">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
