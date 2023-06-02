import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { ADD_WEAVE } from "../utils/mutations";
import Auth from '../utils/auth';
import NotAuthorized from "../Components/NotAuthorized";
import { Link } from "react-router-dom";

const Weave = () => {
  const { search } = useLocation();
  const location = useLocation();
  const postTextFromURL = new URLSearchParams(location.search).get('postText');
  const [postText, setPostText] = useState("");
  const [genre, setGenre] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  useEffect(() => {
    if (postTextFromURL) {
      setPostText(postTextFromURL);
    }
  }, [postTextFromURL]);
  

  useEffect(() => {
    if (postText) {
      setPostText(postText.replace(/-/g, ' '));
    }
  }, [postText]);
  

  const [postTitle, setPostTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [addWeave, { error }] = useMutation(ADD_WEAVE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addWeave({
        variables: {
          postTitle,
          postText,
          weaveAuthor: Auth.getProfile().data.username,
        },
      });
      setPostTitle("");
      setPostText("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
    setIsPublished(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 15000) {
      setPostText(value);
    }

    if (name === "postTitle" && value.length <= 200) {
      setPostTitle(value);
    }
  };

  const handleCreateWeave = () => {
    setShowModal(true); // Show the modal when the create post button is clicked
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
      {!isPublished ? (
      <div className="post-form">
        <div className="create-post-section">
                <button className="create-post-btn" onClick={handleCreateWeave}>
                  Publish
                </button>
              </div>
        <form
          id="spacing"
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="post-title">
            <label htmlFor="postTitle"></label>
            <input
              type="text"
              placeholder="Title"
              name="postTitle"
              value={postTitle}
              className="title-input"
              onChange={handleChange}
            />
          </div>
          <div className="question-post">
            <label htmlFor="postText"></label>
            <textarea
              name="postText"
              value={postText}
              className="post-input"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            />
          </div>
          {/* <button className="weaveBtn" type="submit">
            Create Post !
          </button> */}
        </form>
      </div>
      ) : (
        <div className="success">
          <h2>Story Published!</h2>
          <Link to="/me">View Post</Link>
        </div>
      )}
      {showModal && ( // Render the modal if showModal is true
            <div className="post-modal">
              <div className="post-modal-content">
              <button
                    className="exit-modal"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                <div className="post-item-info">
                  <div className="confirm-post">
                    <h3>Preview Story</h3>
                    <h4>{postTitle}</h4>
                    <p>{postText.slice(0, 125)}...</p>
                  </div>

                  <div className="genre-select">
                    <p>Select the genre that best fits your story.</p>
                    <label htmlFor="genre">Genre:</label>
                    <select
                      name="genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    >
                      <option value="ACTION">Action</option>
                      <option value="ADVENTURE">Adventure</option>
                      <option value="COMEDY">Comedy</option>
                      <option value="DRAMA">Drama</option>
                      <option value="FANTASY">Fantasy</option>
                      <option value="HORROR">Horror</option>
                      <option value="MYSTERY">Mystery</option>
                      <option value="OTHER">Other</option>
                      <option value="ROMANCE">Romance</option>
                      <option value="SCIENCE_FICTION">Sci-Fi</option>
                      <option value="THRILLER">Thriller</option>
                    </select>
                    <div className="modal-btns">
                  <button className="submit-btn" onClick={handleFormSubmit}>
                    Publish
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
                  </div>
                </div>
               
              </div>
            </div>
          )}
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};

export default Weave;
