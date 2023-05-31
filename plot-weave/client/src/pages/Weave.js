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

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
      {!isPublished ? (
      <div className="post-form">
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
          <button className="weaveBtn" type="submit">
            Create Post !
          </button>
        </form>
      </div>
      ) : (
        <div className="success">
          <h2>Story Published!</h2>
          <Link to="/me">View Post</Link>
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
