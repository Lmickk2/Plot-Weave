import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import NotAuthorized from "../Components/NotAuthorized";
import { Helmet } from "react-helmet";

const CreateStory = () => {
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [genre, setGenre] = useState("");

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

      setIsPublished(true);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          postTitle,
          postText,
          genre,
          postAuthor: Auth.getProfile().data.username,
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
      setCharacterCount(value.length);
    }
    if (name === "postTitle" && value.length <= 80) {
      setPostTitle(value);
    }
  };

  return (
    <div className="appear top-pad">
      <Helmet>
        <title>Plot Weave | Your Story</title>
      </Helmet>

      {Auth.loggedIn() ? (
        <>
          {!isPublished ? ( // Conditionally render based on the state variable
            <div className="post-form">
              <form
                id="spacing"
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
              >
                <div className="post-title">
                  <textarea
                    name="postTitle"
                    placeholder="Title"
                    value={postTitle}
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
              <div className="create-btns">
                <div className="genre-select">
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
                    <option value="ROMANCE">Romance</option>
                    <option value="SCIENCE_FICTION">Sci-Fi</option>
                    <option value="THRILLER">Thriller</option>
                    {/* Add more genre options as needed */}
                  </select>
                </div>

                <button className="weaveBtn" type="submit">
                  Create Post !
                </button>
            </div>
                {error && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    {error.message}
                  </div>
                )}
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

export default CreateStory;
