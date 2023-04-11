import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";

import { ADD_POST, ADD_WEAVE } from "../utils/mutations";
import { QUERY_POSTS, QUERY_WEAVES } from "../utils/queries";

import Auth from "../utils/auth";
import NotAuthorized from "../Components/NotAuthorized";
import { Helmet } from "react-helmet";


const Weave = ({ sentenceText }) => {
  const [postText, setPostText] = useState(sentenceText);
  const [weaveTitle, setWeaveTitle] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const posts = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, posts] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [addWeave] = useMutation(ADD_WEAVE, {
    update(cache, { data: { addWeave } }) {
      try {
        const weaves = cache.readQuery({ query: QUERY_WEAVES });

        cache.writeQuery({
          query: QUERY_WEAVES,
          data: { weaves: [addWeave, weaves] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addWeave({
        variables: {
          weaveTitle,
          postText,
          weaveAuthor: Auth.getProfile().data.username,
        },
      });
      setWeaveTitle("");
      setPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setPostText(sentenceText);
  }, [sentenceText]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 3000) {
      setPostText(value);
      setCharacterCount(value.length);
    }

    if (name === "weaveTitle" && value.length <= 80) {
      setWeaveTitle(value);
    }
  };

  return (
    <div className="appear top-pad">
      <Helmet>
        <title>Plot Weave | Your Story</title>
      </Helmet>

      {Auth.loggedIn() ? (
        <>
          <div className="post-form">
            <form
              id="spacing"
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="post-title">
                <textarea
                  name="weaveTitle"
                  placeholder="Title"
                  value={weaveTitle}
                  className="title-input"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="question-post">
                <textarea
                  name="postText"
                  placeholder="Start Writing!"
                  value={postText}
                  className="post-input"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                ></textarea>
              </div>
              <p
                className={`type-white ${
                  characterCount === 3000 || error ? "text-danger" : ""
                }`}
              >
                Character Count: {characterCount}/3000
              </p>

              <button className="start" type="submit">
                Create Post !
              </button>

              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};

export default Weave;
