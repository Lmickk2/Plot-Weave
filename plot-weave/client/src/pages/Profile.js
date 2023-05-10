import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import betaTester from "../images/beta.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
  faUsers,
} from "@fortawesome/free-brands-svg-icons";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { UPDATE_USER, ADD_FOLLOWER } from "../utils/mutations";

import Auth from "../utils/auth";
import WeaveList from "../Components/WeaveList";

const Profile = () => {
  const { username: userParam } = useParams();

  const [showThoughts, setShowThoughts] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [showWeaves, setShowWeaves] = useState(false);

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

  const toggleEditProfile = () => {
    if (user.username === Auth.getProfile().data.username) {
      setShowEditProfile(!showEditProfile);
      const modal = document.querySelector(".modal");
      modal.classList.toggle("show");
    }
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

      const profile = Auth.getProfile();
      profile.data.bio = data.updateUser.bio;
      profile.data.profilePicture = data.updateUser.profilePicture;
      Auth.setProfile(profile);
    } catch (e) {
      console.error(e);
    }
  };
  const [showAllPosts, setShowAllPosts] = useState(false);
  const displayedPosts = showAllPosts ? user?.posts : user?.posts?.slice(0, 3);

  const handleViewMore = () => {
    setShowAllPosts(true);
  };

  const handleViewLess = () => {
    setShowAllPosts(false);
  };

  const [followUser] = useMutation(ADD_FOLLOWER);

  const handleFollow = async () => {
    try {
      await followUser({
        variables: { followeeId: user._id },
        update: (cache, { data }) => {
          // Update the cached user data with the new follower
          const cachedUser = cache.readQuery({
            query: QUERY_USER,
            variables: { username: userParam },
          });
          cache.writeQuery({
            query: QUERY_USER,
            variables: { username: userParam },
            data: {
              user: {
                ...cachedUser.user,
                followers: [
                  ...cachedUser.user.followers,
                  data.followUser.followers[0],
                ],
              },
            },
          });
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const [selectedButton, setSelectedButton] = useState("about");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
    );
  }

  return (
    <div className="prof-page appear">
      <Helmet>
        <title>Plot Weave | Profile</title>
      </Helmet>
      <div>
        <div className="profile-container">
          <div className="profile-info">
            <div className="prof-head">
              <div className="user-identity">
                <img src={betaTester} className="profile-img" alt="" />
                <div className="user-details">
                  <p className="username">
                    <b>{userParam ? `${user.username}` : `${user.username}`}</b>
                  </p>
                </div>
                <div className="user-stats">
                  <p>
                    Followers
                    <br />
                    0
                  </p>
                  <p>
                    Stories
                    <br />
                    {user.posts.length}
                  </p>
                  <p>
                    Weaves
                    <br />
                    {user.weaves.length}
                  </p>
                </div>
                <div className="edit-profile">
                  <span
                    className="pencil-icon"
                    onClick={() => setShowEditProfile(!showEditProfile)}
                  >
                   Edit Profile &#9998;
                  </span>
                  {showEditProfile && (
                    <div className="modal">
                      <form onSubmit={handleProfileUpdate}>
                        <button className="exit" onClick={toggleEditProfile}>
                          Exit
                        </button>
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
                      <button
                        className="close-modal"
                        onClick={toggleEditProfile}
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>
                <div class="social-media">
                  <a href="https://www.facebook.com/">
                    <FontAwesomeIcon icon={faFacebook} id="fb" />
                  </a>
                  <a href="https://www.instagram.com/">
                    <FontAwesomeIcon icon={faInstagram} id="ig" />
                  </a>
                  <a href="https://twitter.com/?lang=en">
                    <FontAwesomeIcon icon={faTwitter} id="tw" />
                  </a>
                  <a href="https://www.youtube.com/">
                    <FontAwesomeIcon icon={faYoutube} id="yt" />
                  </a>
                </div>
              </div>
            </div>
            <div className="prof-nav">
              <button
                className={selectedButton === "about" ? "bold" : ""}
                onClick={() => handleButtonClick("about")}
              >
                About
              </button>
              <button
                className={
                  selectedButton === "weaves"
                    ? "bold weave-button"
                    : "weave-button"
                }
                onClick={() => handleButtonClick("weaves")}
                onClick={() => setShowWeaves(!showWeaves)}
              >
                Weaves
              </button>
              <button
                className={selectedButton === "following" ? "bold" : ""}
                onClick={() => handleButtonClick("following")}
              >
                Following
              </button>
              <button
                className={
                  selectedButton === "follow" ? "bold follow" : "follow"
                }
                onClick={() => handleButtonClick("follow")}
              >
                Follow
              </button>
            </div>
            <div className="split-section">
              <div className="about-me">
                {user.bio === undefined ? (
                  <p>No bio yet.</p>
                ) : (
                <p>
                {user.bio}
                </p>
                )}
              </div>
              {showWeaves ? (
                <WeaveList />
              ) : (
                <div className="user-activity">
                  <h3>{user?.username}'s Posts</h3>
                  <p>Viewing {user.posts.length} Posts</p>
                  <div className="user-posts">
                    {displayedPosts?.map((post) => (
                      <div key={post._id} className="post">
                        <h4>
                          <Link to={`/post/${post._id}`}>{post.postTitle}</Link>{" "}
                          <span className="post-date">
                            {/* {new Date(post.createdAt).toLocaleDateString()} */}
                          </span>
                        </h4>
                        <p>{post.postText.slice(0, 150) + "..."}</p>
                      </div>
                    ))}
                    {!showAllPosts &&
                      displayedPosts?.length < (user?.posts?.length || 0) && (
                        <button onClick={handleViewMore} className="show-view">
                          View More
                        </button>
                      )}
                    {showAllPosts && (
                      <button onClick={handleViewLess} className="show-view">
                        View Less
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="recently-answered"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
