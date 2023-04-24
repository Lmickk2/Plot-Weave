import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useMutation } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const [showThoughts, setShowThoughts] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  useEffect(() => {
    if (loading) {
      return;
    }
    
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      return <Navigate to="/me" />;
    }

    if (!user?.username) {
      return (
        <div className="not-authorized">
          <p>You are not authorized to view this page.</p>
        </div>
      );
    }

    if (data && data.user) {
      setBio(data.user.bio || "");
    }
  }, [loading, user, data, userParam]);

  const toggleThoughts = () => {
    setShowThoughts(!showThoughts);
  };

  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };
  
  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateUser({
        variables: { bio, profilePicture },
      });

      setBio(data.updateUser.bio);
      setProfilePicture(null);
      setShowEditProfile(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
    );
  }

  return (
    <div className="appear">
      <Helmet>
        <title>Plot Weave | Profile</title>
      </Helmet>
      <div>
        <div className="profile-container">
          {/* <h1>Hello, {user.username}</h1> */}
          <div className="profile-info">
          <img src={user.profilePicture} className="profile-img" alt="" />
            <div className="user-details">
              <p className="username">
                <b>{user.username}</b>
              </p>
              <p>{user.bio}</p>
              <div className="edit-profile">
                <span className="pencil-icon" onClick={() => setShowEditProfile(!showEditProfile)}>
                  &#9998;
                </span>
                {showEditProfile && (
                  <form onSubmit={handleProfileUpdate}>
                    <textarea
                      placeholder="Tell us about yourself"
                      value={bio}
                      onChange={handleBioChange}
                    />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleProfilePictureChange}
                    />
                    <button type="submit">Update Profile</button>
                  </form>
                )}
              </div>
              <div className="user-answers">
                <h3>Recently Asked Questions</h3>
                <hr />
              </div>
              <button className="toggle-thoughts" onClick={toggleThoughts}>
                {showThoughts ? (
                  <span>Collapse &#8613;</span>
                ) : (
                  <span>Expand &#8615;</span>
                )}
              </button>
              <div className="recently-answered"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Profile;
