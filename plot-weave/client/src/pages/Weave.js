import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { ADD_WEAVE } from "../utils/mutations";
import Auth from '../utils/auth';

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
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 3000) {
      setPostText(value);
    }

    if (name === "postTitle" && value.length <= 80) {
      setPostTitle(value);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Weave;
